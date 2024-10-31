const express = require('express');
const fs = require('fs/promises');
const mqtt = require('mqtt');
const app = express();
var cors = require('cors');
const mysql = require('mysql2');
app.use(express.static("public"));
app.use(cors());

// Configuração do MQTT
const mqttBrokerUrl = 'mqtt://ip-broker';
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

//Configuração do MySQL
const db ={
    host     : 'localhost',
    port     : 3306,
    user     : 'admin',
    password : 'admin',
    database : 'projeto'
  }

function execSQLQuery(sqlQry, id, res){
  const connection = mysql.createConnection(db);
  
  connection.query(sqlQry, id, (error, results, fields) => {
    if(res){
      if(error) 
        res.json(error);
      else
        res.json(results);
    }else 
        console.log(error);
        
      connection.end();
      console.log('executou!');
  });
}

app.get('/api/sensor', (req, res) => {
    execSQLQuery('SELECT * FROM sensor', null, res);
})

// Função para armazenar dados do sensor no arquivo JSON
function storeSensorData(data) {
    const id =[JSON.stringify(data)];
    execSQLQuery('INSERT INTO sensor(value) VALUES(?)',id, null);
}

const port = 3000; // Escolha a porta desejada

app.listen(port, () => {
    console.log(`WebServer iniciado na porta ${port}`);
});
