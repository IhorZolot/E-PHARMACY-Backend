import mongoose from 'mongoose'
import app from './app.js'

const PORT = process.env.PORT || 3001

mongoose
	.connect(process.env.DB_HOST)
	.then(() => {
		app.listen(3000, () => {
			console.log(`Server running. Use our API on port:${PORT}`)
		})
	})
	.catch(error => {
		console.log('Server error:', error.message)
		process.exit(1)
	})
