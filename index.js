import express from 'express'
import mongoose from 'mongoose'

//1eUxm78kWDqbxaMz
const DB_HOST =
	'mongodb+srv://Ihor:1eUxm78kWDqbxaMz@cluster0.jt0wk.mongodb.net/franchise?retryWrites=true&w=majority&appName=Cluster0'
const app = express()

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(3001, error => {
			if (error) {
				return console.log(`Server error. ${error.message}`)
			}
			console.log('Server on port 3001')
		})
	})
	.catch(error => {
		console.log(`Server error. ${error.message}`)
		process.exit(1)
	})

app.get('/', (request, response) => {
	response.send('<h1>Home page</h1>')
})
app.get('/contacts', (request, response) => {
	console.log(request.url)
	console.log(request.method)
	console.log(response)
	// console.log(request.json)
	response.send('<h1>Contacts page‹/h1>')
})
