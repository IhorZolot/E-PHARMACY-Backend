import express from 'express'
import 'dotenv/config'

const app = express()
app.use((req, res, next) => {
	console.log('Access-Control-Allow-Origin')
	next()
})

app.get('/', (req, res) => {
	res.json([])
})
app.get('/contacts', (req, res) => {
	res.send('<h1>Contacts page</h1>')
})

export default app
