import mongoose from 'mongoose'
import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT

mongoose
	.connect(process.env.DB_HOST)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`)
		})
	})
	.catch(error => {
		console.log('Server error:', error.message)
		process.exit(1)
	})
