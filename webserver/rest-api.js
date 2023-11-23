const express = require('express');
const app = express();
const port = 3000; //porta padrão
const mysql = require('mysql2');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var cors = require('cors');
app.use(express.static("public"));
app.use(cors());

app.use(express.json());	
app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

const db ={
    host     : '18.214.104.16',
    port     : 3306,
    user     : '00000000000',
    password : '00000000000',
    database : '00000000000'
  }


function execSQLQuery(sqlQry, id, res){
  const connection = mysql.createConnection(db);
  
  connection.query(sqlQry, id, (error, results, fields) => {
    
      if(error) 
        res.json(error);
      else
        res.json(results);
    
      connection.end();
      console.log('executou!');
  });
}


app.get('/usuarios', (req, res) => {
   
    execSQLQuery('SELECT * FROM usuario', null, res);
})


app.get('/usuarios/:id?', (req, res) => {
    const id = [req.params.id];
    execSQLQuery('SELECT * FROM usuario  WHERE usu_id=?',id, res);
})


app.delete('/usuarios/:id', (req, res) =>{
    const id = [req.params.id];
    execSQLQuery('DELETE FROM usuario WHERE idusuario=?',id, res);
})


app.post('/usuarios', (req, res) => {
    const data = req.body;
    const id = [data.nome];
    execSQLQuery('INSERT INTO usuario(usu_nome) VALUES(?)',id, res);
});


app.put('/usuarios/:id', (req, res) => {
  const data = req.body; 
  const id = [data.nome,req.params.id];
  execSQLQuery('UPDATE usuario SET usu_nome=? WHERE idusuario=?',id, res);
});

app.get('/external', (req, res) => {
const response = fetch('https://dog.ceo/api/breeds/list/all',{
	method: 'get',
	//body: JSON.stringify(req.body),
	headers: {'Content-Type': 'application/json'}
})  .then(response => response.json()) 
    .then(json => res.json(json))   
    .catch(err => console.log('Erro de solicitação', err)); 

});

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
