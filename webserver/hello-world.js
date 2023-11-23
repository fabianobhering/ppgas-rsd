const http = require('http');

const server = http.createServer((req, res) => {
  // Configuração do cabeçalho de resposta
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Corpo da resposta
  res.end('Hello, World!\n');
});

// Porta em que o servidor irá escutar
const porta = 3000;

// Inicia o servidor e escuta na porta especificada
server.listen(porta, () => {
  console.log(`Servidor Node.js está ouvindo em http://localhost:${porta}/`);
});
