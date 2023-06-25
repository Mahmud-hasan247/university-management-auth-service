import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'

const { port, database_url } = config

async function main() {
  try {
    await mongoose.connect(database_url as string)
    logger.info('Database is Connected successfully')
    app.listen(port, () => {
      logger.info(`University Application is listening on port ${port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }
}

main()
