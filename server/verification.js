const jwt = require('jsonwebtoken')

const verify = (req, res, next)=>{
    const accessToken = req.headers.token
    
    const sliptedToken = accessToken.split(" ")[1]
    
    if(!sliptedToken){
        return res.status(400).json("you are not permitted")
    }

    // then here we verity our jwt tokens
    jwt.verify(sliptedToken, process.env.SECRET_KEY , (err, User)=>{
        if(err){
            return res.status(400).json("your token is not correct, please login again and continue")
        }
        req.user = User
        
        next()
    })
}

module.exports = {verify}