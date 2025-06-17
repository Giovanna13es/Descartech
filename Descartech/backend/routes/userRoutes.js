const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/db');

// Cadastro
router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos' });
  }

  try {
    const hash = await bcrypt.hash(senha, 10);
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, hash], (err, result) => {
      if (err) return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
    });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor' });
  }
});

// Login
// Login corrigido
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro no servidor' });
    if (results.length === 0) return res.status(401).json({ mensagem: 'Usuário não encontrado' });

    const usuario = results[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) return res.status(401).json({ mensagem: 'Senha incorreta' });

    res.json({
      mensagem: 'Login realizado com sucesso',
      usuario: {
        usuario_id: usuario.usuario_id,
        nome: usuario.nome,
        email: usuario.email,
      }
    });
  });
});


// Buscar perfil
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT usuario_id, nome, email, foto FROM usuarios WHERE usuario_id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
    if (results.length === 0) return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    res.json(results[0]);
  });
});

// Atualizar nome
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) return res.status(400).json({ mensagem: 'Nome é obrigatório' });

  const sql = 'UPDATE usuarios SET nome = ? WHERE usuario_id = ?';
  db.query(sql, [nome, id], (err, result) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao atualizar nome' });
    res.json({ mensagem: 'Nome atualizado com sucesso' });
  });
});

module.exports = router;
