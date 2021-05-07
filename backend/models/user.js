const Sequelize = require('sequelize')
const sequelize = require('../database/sequelize')
const User = sequelize.define("users", {
    name: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },

    profile_image: {
        type: Sequelize.STRING(200),
      }
});


User.sync().then(function(){
    return ''
})


module.exports = User