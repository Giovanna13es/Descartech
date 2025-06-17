const express = require('express');
const router = express.Router();
const db = require('../models/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, 'dispositivo-' + uniqueSuffix);
  }
});

const upload = multer({ storage });

const descricoes = {
  celulares: "Celulares, smartphones, Tablets geralmente duram de 2 a 5 anos...",
  notebooks: "Computadores, teclados e notebooks têm uma durabilidade de 4 a 6 anos...",
  tablets: "Celulares, smartphones, Tablets geralmente duram de 2 a 5 anos...",
  monitores: "Televisores e monitores costumam durar entre 7 e 10 anos...",
  impressoras_scanners: "Impressoras e scanners têm vida útil de 3 a 5 anos...",
  teclados: "Computadores, teclados e notebooks têm uma durabilidade de 4 a 6 anos...",
  desktop: "Computadores, teclados e notebooks têm uma durabilidade de 4 a 6 anos...",
  cabos_carregadores: "Cabos e carregadores duram entre 2 a 4 anos...",
  baterias_pilhas: "Baterias e pilhas recarregáveis duram de 1 a 3 anos..."
};

const tiposPermitidos = Object.keys(descricoes);

// Rota de cadastro de dispositivo
router.post('/cadastro', upload.single('foto'), (req, res) => {
  const { usuario_id, nome, tipo, data_compra } = req.body;

  if (!usuario_id || !nome || !tipo) {
    return res.status(400).json({ mensagem: "Preencha usuario_id, nome e tipo." });
  }

  if (!tiposPermitidos.includes(tipo)) {
    return res.status(400).json({ mensagem: "Tipo de dispositivo inválido." });
  }

  const descricao = descricoes[tipo];
  const fotoPath = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `INSERT INTO dispositivos (usuario_id, nome, tipo, descricao, data_compra, foto) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [usuario_id, nome, tipo, descricao, data_compra || null, fotoPath], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar dispositivo:", err);
      return res.status(500).json({ mensagem: "Erro interno ao cadastrar dispositivo." });
    }
    res.status(201).json({ mensagem: "Dispositivo cadastrado com sucesso!", foto: fotoPath });
  });
});

router.delete('/deletar/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM dispositivos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar dispositivo:', err);
      return res.status(500).json({ mensagem: 'Erro interno ao deletar dispositivo.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Dispositivo não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Dispositivo deletado com sucesso.' });
  });
});

router.get('/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const sql = 'SELECT * FROM dispositivos WHERE usuario_id = ?';
  db.query(sql, [usuario_id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dispositivos:', err);
      return res.status(500).json({ mensagem: 'Erro interno ao buscar dispositivos.' });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
