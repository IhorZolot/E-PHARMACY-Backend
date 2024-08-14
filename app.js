import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/', (request, response) => {
	response.send('<h1>Home page</h1>')
})
app.get('/contacts', (request, response) => {
	response.send('<h1>Contacts page</h1>')
})

export default app
