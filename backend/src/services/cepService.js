const VIA_CEP_BASE_URL = 'https://viacep.com.br/ws'

const getMensagem = () => {
    return { texto: 'Olá do Servidor!' }
}

const searchCepJson = async (cep) => {
    const resposta = await fetch(`${VIA_CEP_BASE_URL}/${encodeURIComponent(cep)}/json`)
    return resposta.json()
}

const searchCepXml = async (cep) => {
    const resposta = await fetch(`${VIA_CEP_BASE_URL}/${encodeURIComponent(cep)}/xml`)
    return resposta.text()
}

const searchAddressJson = async (uf, cidade, logradouro) => {
    const resposta = await fetch(
        `${VIA_CEP_BASE_URL}/${encodeURIComponent(uf)}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/json`
    )

    return resposta.json()
}

const searchAddressXml = async (uf, cidade, logradouro) => {
    const resposta = await fetch(
        `${VIA_CEP_BASE_URL}/${encodeURIComponent(uf)}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/xml`
    )

    return resposta.text()
}

module.exports = {
    getMensagem,
    searchCepJson,
    searchCepXml,
    searchAddressJson,
    searchAddressXml,
}