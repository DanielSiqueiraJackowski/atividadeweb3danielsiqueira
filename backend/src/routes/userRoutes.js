const express = require('express')

const router = express.Router()

const userController = require('../controllers/userController')

// Listar todos
router.get('/', userController.searchUser)

// Listar por ID
router.get('/:id', userController.getUserById)

// Criar
router.post('/', userController.createUser)

// Editar
router.put('/:id', userController.updateUser)

// Excluir
router.delete('/:id', userController.deleteUser)

module.exports = router