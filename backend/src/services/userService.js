const User = require('../models/User')  

const getAllUsers = async () => {
    return await User.findAll()
}

module.exports = { getAllUsers }