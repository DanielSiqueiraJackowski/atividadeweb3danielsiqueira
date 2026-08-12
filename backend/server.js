const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/mensagem', (req, res) => {
    res.json({ texto: "Olá do Servidor!"})
});

app.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) return res.status(404).json({ erro: 'CEP não encontrado' });

        res.status(200).json(dados);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar o CEP' })
    }
})

app.listen(3000)