const http = require('http');
const colors = require('colors');
const fs = require('fs');
const path = require('path');

//simular dados de um banco de dados
const dados = [
    { id: 1, nomedados: "nome dos dados 1", valor: 100},
    { id: 2, nomedados: "nome dos dados 1", valor: 200},
    { id: 3, nomedados: "nome dos dados 1", valor: 300}
];

//criar o servidor
//função callback que recebe a requisitação (req) e a resposta (res)
// req (Request): informações sobre pedido do usuário.
// res (Response): objeto para enviar a resposta de volta ao usuário
const server = http.createServer((req, res) => {


    console.log('Requisitação recebida: ${req.url}' .green);


    if (req.url === '/') {

        const filePath = path.join(__dirname, 'public', 'index.html');

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro do servidor');
            }else{
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(content);
            }
        })
    }



    else if (req.url === '/api/dados') {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(dados));
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('Página não encontrada (404)')
    }
})


const PORT = 3000;


server.listen(PORT, () => {
    console.log(`Servidor rodando http://localhost:${PORT}`.green)
})
