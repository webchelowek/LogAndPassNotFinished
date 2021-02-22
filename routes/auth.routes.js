const {Router} = require('express')
const bcrypt = require('bcrypt')
const router = Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')
const {validationResult, check} = require('express-validator')

router.post('/register',
    [
                check('email', 'Wrong email').isEmail,
                check('password','Wrong password').exists,
                check('name','Wrong name').exists
            ],
            async (req, res) => {
    try{
        const {email, password, name} = req.body

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({
                message: 'Wrong reg data',
                errors: errors.array()
            })
        }

        const candidate = await User.findOne({email})

        if (candidate){
            res.status(400).json({message: 'This email already exist on the server'})
        }

        const hashPassword = await bcrypt.hash(password)
        const user = new User({email, password: hashPassword, name})

        await user.save()

        res.status(201).json({message: "User created"})
    } catch (e){
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.post('/login',
    [
        check('email', 'Wrong email').isEmail,
        check('password','Wrong password').exists,
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({
                message: 'Wrong login data',
                errors: errors.array()
            })
        }

        const {email, password} = req.body

        const user = User.findOne({email})

        if(!user){
            res.status(400).json({message: 'User not found'})
        }

        const isMatch = bcrypt.compare(password, user.password)

        if(!isMatch){
            res.status(400).json({message: 'Wrong password'})
        }

        const token = jwt.sign(
            {userId: user.id},
                config.get('jwtKey'),
            {expiresIn: '1h'}
        )

        res.status(200).json({token, userId: user.id })

    } catch (e){
        res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = router