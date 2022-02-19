const router = require('express').Router()
const {models: {User, Car, Sale}} = require('../db')


router.get('/users', async(req, res, next) => {
	try {
		const users = await User.findAll({
		})
		res.send(users)
	}
	catch(ex){
		next(ex)
	}
})


router.get('/cars', async(req, res, next) => {
	try {
		const cars = await Car.findAll()
		res.send(cars)
	}
	catch(ex){
		next(ex)
	}
})


router.get('/users/:id/sales', async(req, res, next) => {
	try {
		res.send(await Sale.findAll({
			where: {
				userId: req.params.id
			},
			include: [Car]
		}))
	}
	catch(ex){
		next(ex)
	}
})

router.post('/users/:id/sales', async(req, res, next)=> {
	try {
		let sale = await Sale.create({...req.body, userId: req.params.id})
		sale = await Sale.findByPk(sale.id, {
			include: [Car]
		})
		res.send(sale)
	}
	catch(ex) {
		next(ex)
	}
})


module.exports = router