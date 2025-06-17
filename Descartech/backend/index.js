const express = require('express');
const app = express();

const cors = require('cors');

const authRoutes = require('./routes/auth');
const dispositivosRouter = require('./routes/dispositivos');

// Middleware para CORS e parsing JSON
app.use(cors());
app.use(express.json());

// Rotas
app.use('/', authRoutes);
app.use('/dispositivos', dispositivosRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
