const cepService = require('../services/cepService')

const getMensagem = (req, res) => {
    const mensagem = cepService.getMensagem()
    res.status(200).json(mensagem)
}

const getCepJson = async (req, res) => {
    const { cep } = req.params

    try {
        const dados = await cepService.searchCepJson(cep)

        if (dados.erro) return res.status(404).json({ erro: 'CEP não encontrado' })

        return res.status(200).json(dados)
    } 
    
    catch (err) {
        return res.status(500).json({ erro: 'Erro de comunicação com VIACEP' })
    }
}

const getCepXml = async (req, res) => {
    const { cep } = req.params

    try {
        const dados = await cepService.searchCepXml(cep)

        if (dados.includes('erro')) return res.status(404).json({ erro: 'CEP não encontrado' })

        return res.status(200).set('Content-Type', 'application/xml').send(dados)
    } 
    
    catch (err) {
        return res.status(500).json({ erro: 'Erro de comunicação com VIACEP' })
    }
}

const getAddressJson = async (req, res) => {
    const { uf, cidade, logradouro } = req.params

    try {
        const dados = await cepService.searchAddressJson(uf, cidade, logradouro)

        if (Array.isArray(dados) && dados.length === 0) return res.status(404).json({ erro: 'CEP não encontrado' })

        return res.status(200).json(dados)
    } 
    
    catch (err) {
        return res.status(500).json({ erro: 'Erro de comunicação com VIACEP' })
    }
}

const getAddressXml = async (req, res) => {
    const { uf, cidade, logradouro } = req.params

    try {
        const dados = await cepService.searchAddressXml(uf, cidade, logradouro)

        if (dados.includes('erro')) return res.status(404).json({ erro: 'CEP não encontrado' })

        return res.status(200).set('Content-Type', 'application/xml').send(dados)
    } 
    
    catch (err) {
        return res.status(500).json({ erro: 'Erro de comunicação com VIACEP' })
    }
}

module.exports = {
    getMensagem,
    getCepJson,
    getCepXml,
    getAddressJson,
    getAddressXml,
}