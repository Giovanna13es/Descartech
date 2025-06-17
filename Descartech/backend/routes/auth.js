const express = require('express');
const router = express.Router();
const db = require('../models/db'); // conexão com o banco de dados

// Rota de login
router.post('/usuarios/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Preencha email e senha.' });
  }

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.query(query, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
    }

    const usuario = results[0];
    res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  });
});

// Rota de cadastro
router.post('/usuarios/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Preencha nome, email e senha.' });
  }

  const verificarUsuario = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(verificarUsuario, [email], (err, results) => {
    if (err) {
      console.error('Erro ao verificar email:', err);
      return res.status(500).json({ mensagem: 'Erro interno.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ mensagem: 'Email já cadastrado.' });
    }

    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, senha], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar:', err);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.' });
      }

      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    });
  });
});

// ✅ Rota para buscar dados de um usuário por ID
router.get('/usuarios/:id', (req, res) => {
  const usuarioId = req.params.id;

  const sql = 'SELECT id, nome, email FROM usuarios WHERE id = ?';
  db.query(sql, [usuarioId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário por ID:', err);
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    const usuario = results[0];
    res.status(200).json(usuario);
  });
});

module.exports = router;
