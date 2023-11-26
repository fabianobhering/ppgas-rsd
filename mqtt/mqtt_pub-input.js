const mqtt = require('mqtt');
const readline = require('readline');

// Substitua 'mqtt://broker.example.com' pelo URL ou IP do seu broker MQTT
const brokerUrl = 'mqtt://broker.example.com';
// Substitua 'pelo seu tópico'
const topic = 'seu/topico';

// Cria um cliente MQTT
const client = mqtt.connect(brokerUrl);

// Cria uma interface de leitura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para publicar a mensagem no tópico
function publicarMensagem(mensagem) {
  client.publish(topic, mensagem, () => {
    console.log(`Mensagem publicada no tópico ${topic}: ${mensagem}`);
  });
}

// Função para continuar lendo mensagens até que o usuário digite "fim"
function lerMensagens() {
  rl.question('Digite a mensagem para publicar no tópico (ou "fim" para encerrar): ', (mensagem) => {
    if (mensagem.toLowerCase() !== 'fim') {
      // Publica a mensagem no tópico
      publicarMensagem(mensagem);
      // Chama a função novamente para continuar lendo mensagens
      lerMensagens();
    } else {
      // Fecha a interface de leitura e a conexão MQTT quando o usuário digita "fim"
      rl.close();
      client.end();
      console.log('Programa encerrado.');
    }
  });
}

// Evento quando o cliente MQTT se conecta ao broker
client.on('connect', () => {
  console.log(`Conectado ao broker MQTT em ${brokerUrl}`);
  // Inicia a leitura de mensagens
  lerMensagens();
});

// Evento quando o cliente MQTT é desconectado
client.on('close', () => {
  console.log('Desconectado do broker MQTT.');
});
