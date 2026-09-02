const userService = require('../services/userService')

// LISTAR TODOS
const searchUser = async (req, res) => {
    try {
        const users = await userService.getAllUsers()

        return res.status(200).json({
            data: users
        })
    } catch (err) {
        return res.status(500).json({
            err: 'Erro interno ao buscar usuários'
        })
    }
}

// LISTAR POR ID
const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await userService.getUserById(id)

        if (!user) {
            return res.status(404).json({
                err: 'Usuário não encontrado'
            })
        }

        return res.status(200).json({
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            err: 'Erro interno ao buscar usuário'
        })
    }
}

// CRIAR
const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body)

        return res.status(201).json({
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            err: 'Erro interno ao criar usuário'
        })
    }
}

// EDITAR
const updateUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await userService.updateUser(
            id,
            req.body
        )

        if (!user) {
            return res.status(404).json({
                err: 'Usuário não encontrado'
            })
        }

        return res.status(200).json({
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            err: 'Erro interno ao editar usuário'
        })
    }
}

// EXCLUIR
const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await userService.deleteUser(id)

        if (!user) {
            return res.status(404).json({
                err: 'Usuário não encontrado'
            })
        }

        return res.status(200).json({
            message: 'Usuário excluído com sucesso'
        })
    } catch (err) {
        return res.status(500).json({
            err: 'Erro interno ao excluir usuário'
        })
    }
}

module.exports = {
    searchUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}