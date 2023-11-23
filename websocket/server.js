const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
    console.log('Cliente conectado.');

    // Evento quando recebe uma mensagem do cliente
    socket.on('message', (mensagem) => {
        console.log(`Mensagem recebida: ${mensagem}`);

        // Envia uma resposta de volta para o cliente
        socket.send(`Você disse: ${mensagem}`);
    });

    // Evento quando o cliente se desconecta
    socket.on('close', () => {
        console.log('Cliente desconectado.');
    });
});
