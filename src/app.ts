import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import userRoutes from './app/modules/user/user.routes'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users/', userRoutes)

// testing purposes
// app.get('/',  (req: Request, res: Response, next: NextFunction) => {
//     console.log(x);

// //    Promise.reject(new Error('unhandled promise rejection!'))
// })

app.use(globalErrorHandler)

export default app
