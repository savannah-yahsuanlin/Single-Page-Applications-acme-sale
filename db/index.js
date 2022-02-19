const Sequelize = require('sequelize')
const {STRING, BOOLEAN, UUID, UUIDV4} = Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_sale')


const User = sequelize.define('user', {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true
	},
	name: {
		type: STRING
	}
})

const Car = sequelize.define('car', {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true
	},
	name: {
		type: STRING
	}
})

const Sale = sequelize.define('sale', {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true
	}, 
	extendedWarranty: {
		type: BOOLEAN,
		defaultValue: false
	}
})

Sale.belongsTo(User)
Sale.belongsTo(Car)


const seedAndSync = async() => {
	
	await sequelize.sync({ force: true })

	const [moe, lucy, larry] = await Promise.all(['moe', 'lucy', 'larry'].map(name => User.create({name})))

	const [ford, toyota, audi] = await Promise.all(['ford', 'toyota', 'audi'].map(name => Car.create({name})))

	const sales = await Promise.all([
		Sale.create({userId: moe.id, carId: ford.id}), 
		Sale.create({userId: moe.id, carId: ford.id, extendedWarranty: true})
	])
}



module.exports = {
	seedAndSync,
	models: {
		User, Car, Sale
	}
}