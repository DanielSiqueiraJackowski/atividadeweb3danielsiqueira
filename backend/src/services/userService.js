const User = require('../models/User')

// Listar todos
const getAllUsers = async () => {
    return await User.findAll()
}

// Buscar por ID
const getUserById = async (id) => {
    return await User.findByPk(id)
}

// Criar
const createUser = async (data) => {
    return await User.create(data)
}

// Editar
const updateUser = async (id, data) => {
    const user = await User.findByPk(id)

    if (!user) {
        return null
    }

    await user.update(data)

    return user
}

// Excluir
const deleteUser = async (id) => {
    const user = await User.findByPk(id)

    if (!user) {
        return null
    }

    await user.destroy()

    return user
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}