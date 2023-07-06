import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { StatusCodes } from 'http-status-codes';

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

// handling not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    success: false,
    message: 'Not Found',
    errorMessages: [{ path: req.originalUrl, message: 'Not Found' }],
  });
  next();
});

export default app;
