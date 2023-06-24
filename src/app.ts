import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import userRoutes from './app/modules/user/user.routes'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users/', userRoutes)

// testing purposes
app.get('/', async (req: Request, res: Response) => {
  res.send('Working successfully!')
})

export default app
