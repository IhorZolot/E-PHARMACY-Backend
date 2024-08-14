import express from 'express'
// import logger from 'morgan'
import cors from 'cors'
import 'dotenv/config'

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
// app.use(logger(formatsLogger))
// app.use(cors())
// app.use(express.json())
const app = express()

app.get('/', (request, response) => {
	response.send('<h1>Home page</h1>')
})
app.get('/contacts', (request, response) => {
	response.send('<h1>Contacts page</h1>')
})

export default app
