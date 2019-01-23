const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res){
    const candidate = await User.findOne({username: req.body.username})

    if(candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        
        if(passwordResult) {
            const token = jwt.sign({
                username: candidate.username,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3600})
            res.status(200).json({
                token: `Bearer ${token}`,
                id: candidate._id,
                username: candidate.username
            })

        }else{
            res.status(401).json({
                message: 'The password is incorrect. Try again'
            })
        }
    } else {
        res.status(404).json({
            message: 'The user with such email was not found'
        })
    }
}

module.exports.register = async function(req, res){
    const candidate = await User.findOne({username: req.body.username})

    if(candidate) {
        res.status(409).json({
            message: 'A user with this email already exists'
        })
    } else {
        const salt = bcrypt.genSaltSync(12)
        const password = req.body.password
        const user = new User({
            username: req.body.username,
            password: bcrypt.hashSync(password, salt)
        })
        try{
            await user.save()
            res.status(201).json(user)
        }catch(e){
            errorHandler(res, e)
        }
    }
}