const User  = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// below here, we create all the neccessary user controller

// to create a user 
const signUp = async(req, res)=>{
    const salt = bcrypt.genSaltSync(10)
    const encryptedPassword = await bcrypt.hash(req.body.password, salt)
    try {
        const user = new User({...req.body, password: encryptedPassword})
        const savedUser = await user.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}

// login a user 
const signIn = async(req, res)=>{

    const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(404).json("incorrect credentials")
        }
    const confirmPassword = await bcrypt.compare(req.body.password, user.password)

    try {
        if(!confirmPassword){
            return res.status(404).json("incorrect password")
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "1000d"} )
        
        // destructuring the user to remove password that will be returned back to them
        const {password, ...others} = user._doc
        res.status(200).send({...others, token})
        
    } catch (error) {
        res.status(404).json(error)
    }
}

// login with email
const withEmail = async(req, res)=>{
    // here we check if there is anyone with the email in our db
    const user = await User.findOne({email: req.body.email})
    try {
        if(user){
            const token = jwt.sign({id:user._id},process.env.SECRET_KEY, {expiresIn: "1000d"} )
            const {password, ...others} = user._doc

            return res.status(200).json({...others, token})
        }else{
            const emailUser = new User({...req.body, regWithMail: true})
            const regedUser = await emailUser.save()

            const token = jwt.sign({id: regedUser._id}, process.env.SECRET_KEY, {expiresIn: "1000d"} )
            const {password, ...others} = regedUser._doc
            res.status(200).json({...others, token})
        }
    } catch (error) {
       res.status(404).json(error) 
    }
}

// here we get all the users 
const getusers = async(req, res)=>{
    try {
        const users = await User.find().sort({createdAt: -1})
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {signIn, signUp, withEmail, getusers}