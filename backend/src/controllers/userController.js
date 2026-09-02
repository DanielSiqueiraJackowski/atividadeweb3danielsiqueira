const userService = require('../services/userService')

const searchUser = async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        res.status(200).json({ data: users})
    }

    catch (err) {
        res.status(500).json({ err: 'Erro interno ao buscar usuários'})
    }
}

module.exports = { searchUser }