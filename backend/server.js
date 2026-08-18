const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/mensagem', (req, res) => {
    res.json({ texto: "Olá do Servidor!"})
})

app.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json`)
        const dados = await resposta.json()

        if(dados.erro) return res.status(404).json({ erro: "CEP não encontrado"})

        res.status(200).json(dados)
    } 

    catch(err) {
        res.status(500).json({ erro: "Erro de comunicação com VIACEP"})
    }
})

app.get('/cep/:cep/xml', async (req, res) => {
    const { cep } = req.params

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/xml`)
        const dados = await resposta.text()

        if(dados.includes('erro')) return res.status(404).json({ erro: "CEP não encontrado"})
        
        res.status(200).set('Content-Type', 'application/xml').send(dados)
    }

    catch(err) {
        res.status(500).json({ erro: "Erro de comunicação com VIACEP"})
    }
})

app.get('/cep/:uf/:cidade/:logradouro', async (req, res) => {
    const { uf, cidade, logradouro } = req.params

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json`)
        const dados = await resposta.json()

        if(Array.isArray(dados) && dados.length === 0) {
            return res.status(404).json({ erro: "CEP não encontrado"})
        }

        res.status(200).json(dados)
    } 

    catch(err) {
        res.status(500).json({ erro: "Erro de comunicação com VIACEP"})
    }
})

app.get('/cep/:uf/:cidade/:logradouro/xml', async (req, res) => {
    const { uf, cidade, logradouro } = req.params

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/xml`)
        const dados = await resposta.text()

        if(dados.includes('erro')) return res.status(404).json({ erro: "CEP não encontrado"})
        
        res.status(200).set('Content-Type', 'application/xml').send(dados)
    }

    catch(err) {
        res.status(500).json({ erro: "Erro de comunicação com VIACEP"})
    }
})

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001') 
})