const express = require('express');
const fs = require('fs/promises');
const mqtt = require('mqtt');
const app = express();
var cors = require('cors');
app.use(express.static("public"));
app.use(cors());

// Configuração do MQTT
const mqttBrokerUrl = 'mqtt://192.168.64.11';
const mqttTopic = 'sensor/dados'; // Substitua pelo tópico MQTT real
const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', () => {
    console.log('Conectado ao broker MQTT');
    mqttClient.subscribe(mqttTopic);
});

mqttClient.on('message', (topic, message) => {
     console.log('Recebeu: '+message.toString());
     const sensorData = JSON.parse(message.toString());
     storeSensorData(sensorData);

});

// Rota para obter o histórico
app.get('/api/historico', async (req, res) => {
    try {
        // Lê os dados do arquivo
        const data = await fs.readFile('historico.json', 'utf-8');
        const sensorHistory = JSON.parse(data);
        res.json(sensorHistory);
    } catch (error) {
        console.error('Erro ao ler o histórico:', error);
        res.status(500).json({ error: 'Erro ao obter o histórico' });
    }
});

// Função para armazenar dados do sensor no arquivo JSON
function storeSensorData(data) {
    fs.readFile('historico.json', 'utf-8')
        .then((currentData) => {
            const sensorHistory = currentData ? JSON.parse(currentData) : [];

            //const sensorHistory = JSON.parse(currentData);
            sensorHistory.push(data);
            return fs.writeFile('historico.json', JSON.stringify(sensorHistory, null, 2), 'utf-8');
        })
        .then(() => {
            console.log('Dado do sensor armazenado com sucesso');
        })
        .catch((error) => {
            console.error('Erro ao armazenar o dado do sensor:', error);
        });
}

const port = 3000; // Escolha a porta desejada

app.listen(port, () => {
    console.log(`WebServer iniciado na porta ${port}`);
});
