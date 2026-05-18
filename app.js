const express = require('express');
const app = express();
const servicos = require('./servicos.json'); // Importação do JSON

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // Necessário para o POST 

app.use(express.static('public'))

// Rota Principal 
app.get('/', (req, res) => {
    res.render('index');
});

// Rota de Serviços com Filtros Dinâmicos
app.get('/servicos', (req, res) => {
    const { busca, precoMax } = req.query; // Captura dados do formulário de filtro
    let listaFiltrada = [...servicos]; // Cria uma cópia da lista original para aplicar os filtros

    // Lógica de Filtro por Texto
    if (busca) {
        listaFiltrada = listaFiltrada.filter(s => 
            s.descricao.toLowerCase().includes(busca.toLowerCase())
        );
    }

    // Lógica de Filtro por Preço 
    if (precoMax) {
        listaFiltrada = listaFiltrada.filter(s => s.preco <= parseFloat(precoMax));
    }

    res.render('servicos', { servicos: listaFiltrada });
});

// Rota de Agendamento
app.get('/agendamento', (req, res) => {
    res.render('agendamento', { servicos }); // Passa serviços para o <select> [cite: 65]
});

// Rota POST de Confirmação 
app.post('/agendar', (req, res) => {
    const dados = req.body;
    res.render('confirmar', { agendamento: dados });
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));