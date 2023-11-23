const readline = require('readline');
const WebSocket = require('ws');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ws = new WebSocket('ws://192.168.64.9:3000'); // Substitua pelo endereço do seu servidor WebSocket

ws.on('open', () => {
  console.log('Conectado ao servidor WebSocket.');

  // Função para continuar solicitando comandos até que o usuário digite "fim"
  function solicitarComando() {
    rl.question('Digite um comando para enviar ao servidor WebSocket (ou "fim" para encerrar): ', (comando) => {
      if (comando.toLowerCase() !== 'fim') {
        // Envia a mensagem para o servidor WebSocket
        ws.send(comando);
        // Chama a função novamente para continuar solicitando comandos
        solicitarComando();
      } else {
        // Fecha a interface de leitura e a conexão WebSocket quando o usuário digita "fim"
        rl.close();
        ws.close();
        console.log('Programa encerrado.');
        process.exit(0);
      }
    });
  }

  // Inicia a solicitação inicial
  solicitarComando();
});

ws.on('message', (mensagem) => {
  console.log(`Recebido do servidor WebSocket: ${mensagem}`);
});
