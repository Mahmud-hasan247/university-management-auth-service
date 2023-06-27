import { createLogger, format, transports } from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label }) => {
  const date = new Date();
  return `${date.toDateString()}, ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Success log' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: `${path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        '%DATE%-success.log'
      )}`,
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Error log' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: `${path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        '%DATE%-error.log'
      )}`,
      datePattern: 'HH--DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errorLogger };
