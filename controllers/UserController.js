
const { comparePassword } = require('../helpers/bcrypt')
const { createToken, verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

class Controller {


    static async index(req, res, next) {
        try {
            const data = await User.findAll()
            res.status(200).json({
                message: 'Sukses',
                data
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async show(req, res, next) {
        try {
            const { id } = req.params

            let data = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })

            res.status(200).json({ data })
        } catch (error) {
            next(error)
        }
    }

    static async store(req, res, next) {
        try {
            const { username, email, password } = req.body
            const user = await User.create({ username, email, password, role:'Guest' })
            res.status(201).json({
                message: "Success Create",
                user
            })
        } catch (error) { next(error) }
    }

    static async update(req, res, next) {
        try {
            const { username, email } = req.body
            const { id } = req.params

            await User.update({ username, email }, { where: { id } })
            const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })

            res.status(200).json({
                message: "Success Update",
                user
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            const data = await User.findOne({ where: { email: email } })
            if (!data) throw { name: "invalidInput" }

            const isValid = comparePassword(password, data.password)
            if (!isValid) throw { name: "invalidInput" }

            const access_token = createToken({ id: data.id, data: data.email })
            res.status(200).json({ access_token })

        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.destroy({
                where: {id}
            })
            if(!user){
                throw {name: 'notFound'}
            }
            res.status(200).json({message: 'success delete user'})
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Controller