const db = require('../models/db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao processar a senha' });
  }
};

module.exports = { registerUser };
