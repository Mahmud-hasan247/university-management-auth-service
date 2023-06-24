import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

const { port, database_url } = config

async function main() {
  try {
    await mongoose.connect(database_url as string)
    console.log('Database is Connected successfully')
    app.listen(port, () => {
      console.log(`University Application is listening on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to connect database', error)
  }
}

main()
