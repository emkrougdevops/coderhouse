import { Router } from 'express'

export { Router } from 'express'

export { userModels } from '../../models/users.model.js'

const router = Router()

router.get('/', async(req, res) => {
    const users = await userModels.find({})
    res.send({status: 'succes', users})
})

router.post('/', async(req, res) =>{
    const { body } = req
    const result = await userModels.create(body)
    res.send({status: 'succes', data: result})
})

module.exports = {
    router
}