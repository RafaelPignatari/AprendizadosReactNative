const express = require("express");
const cors = require('cors');
const server = express(); 
server.use(express.json());
server.use(cors());

server.get('/teste', (req, res)=> {
  res.send('<marquee><h1>Api Funcionando</h1></marquee>');
});  

const LancheRoutes = require('./routes/LancheRoutes');

server.use('/lanche', LancheRoutes);

server.listen(3000, () => {
    console.log('API online');
});