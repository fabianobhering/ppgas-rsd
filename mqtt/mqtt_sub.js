const mqtt = require('mqtt');

// Substitua 'mqtt://broker.example.com' pelo URL ou IP do seu broker MQTT
const brokerUrl ='mqtt://broker.example.com';
const topic = 'seu/topico';

// Cria um cliente MQTT
const client = mqtt.connect(brokerUrl);

// Evento quando o cliente MQTT se conecta ao broker
client.on('connect', () => {
  console.log(`Conectado ao broker MQTT em ${brokerUrl}`);

  // Subscreve ao tópico especificado
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscrito ao tópico: ${topic}`);
    } else {
      console.error(`Erro ao subscrever ao tópico: ${err}`);
    }
  });
});

// Evento quando uma mensagem é recebida no tópico
client.on('message', (receivedTopic, message) => {
  console.log(`Mensagem recebida no tópico ${receivedTopic}: ${message}`);
});

// Evento quando o cliente MQTT é desconectado
client.on('close', () => {
  console.log('Desconectado do broker MQTT.');
});
