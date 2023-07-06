import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes

app.use(routes);

// testing purposes
// app.get(
//   '/',
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     res.status(200).json({
//       message: 'Root is working fine!',
//     });

//     //    Promise.reject(new Error('unhandled promise rejection!'))
//   }
// );

app.use(globalErrorHandler);

export default app;
