const express = require('express');
const app = express();

// Dados simulados para o histórico
// Adicione o código para obter os dados do banco de dados
const sensorHistory = [
    { sensor: 'sensor1', value: 23, timestamp: '2023-01-01T12:00:00Z' },
    { sensor: 'sensor1', value: 25, timestamp: '2023-01-01T12:05:00Z' },
    { sensor: 'sensor1', value: 28, timestamp: '2023-01-01T12:10:00Z' },
    
];

// Adicione um subscrição MQTT para armazenar os dados no banco de dados

// Rota para obter o histórico
app.get('/api/historico', (req, res) => {
    res.json(sensorHistory);
});

const port = 3000; // Escolha a porta desejada

app.listen(port, () => {
    console.log(`Servidor Express iniciado na porta ${port}`);
});
