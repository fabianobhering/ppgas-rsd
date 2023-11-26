const mqtt = require('mqtt');

// Substitua 'mqtt://broker.example.com' pelo URL ou IP do seu broker MQTT
const brokerUrl = 'mqtt://broker.example.com'';
const topic = 'seu/topico';

// Cria um cliente MQTT
const client = mqtt.connect(brokerUrl);

// Função para publicar no tópico a cada 15 segundos
function publicarPeriodicamente() {
  // Gera uma mensagem com um timestamp
  const mensagem = `Mensagem enviada em: ${new Date().toLocaleTimeString()}`;

  // Publica a mensagem no tópico
  client.publish(topic, mensagem, () => {
    console.log(`Publicado no tópico ${topic}: ${mensagem}`);
  });
}

// Evento quando o cliente MQTT se conecta ao broker
client.on('connect', () => {
  console.log(`Conectado ao broker MQTT em ${brokerUrl}`);

  // Inicia a publicação periódica a cada 15 segundos
  setInterval(publicarPeriodicamente, 15000);
});

// Evento quando o cliente MQTT é desconectado
client.on('close', () => {
  console.log('Desconectado do broker MQTT.');
});
