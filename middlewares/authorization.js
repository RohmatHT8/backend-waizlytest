const {User} = require('../models')
async function authorization(req, res, next) {
    try {
        let user = req.params.id ? await User.findByPk(req.params.id) : null
        if (!user && req.params.id) throw { name: "notFound" }
        if (req.user.role === "Admin") {
            next()
        } else {
            if (req.params.id && user.id === req.user.id) next()
            throw { name: "Forbidden" }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization