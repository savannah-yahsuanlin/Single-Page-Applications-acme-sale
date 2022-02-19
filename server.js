const {seedAndSync, models: {User, Car, Sale}} = require('./db')
const express = require('express')
const path = require('path')

const app = express()



app.use('/api', require('./api'))
app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', async(req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

const setUp = async() => {
	try {
		await seedAndSync()
		const port = process.env.PORT || 3000
		app.listen(port, () => {
			console.log(`Listening on port ${port}`)
		})
	}
	catch(ex) {
		console.log(ex)
	}
}

setUp()
