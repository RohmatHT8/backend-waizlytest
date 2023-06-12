const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')

const authentication = async (req, res, next) => {
    try {
        let {access_token} = req.headers
        if(!access_token) throw {name: "noToken"}

        let payload = verifyToken(access_token)
        let user = await User.findOne({ where : { id:payload.id } })  
         
        if(!user) throw {name: "Unautorized"}
        req.user = { id: user.id, role: user.role }
        next()
       }catch(err){
         next(err)
    }
}

module.exports = authentication