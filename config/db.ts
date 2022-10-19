import mongoose, {Connection} from 'mongoose'
import logger from '../utils/logger'
import config from './config'
import {NotFoundError} from '../errors/not-found'
import {DatabaseConnectionError} from '../errors/db-connection'
import {BadRequestError} from '../errors/bad-request'
config.config()

const db: string | undefined = process.env.URI

const connectDB = () => {
    if(!db) throw new NotFoundError()
    try {
        mongoose.connect(db)
        const connection: Connection = mongoose.connection;
        connection.on('connected', () => logger.info('MongoDB connected'));
        connection.on('error', (err) => {
            throw new DatabaseConnectionError()
        })
    } catch (err) {
        throw new BadRequestError(`MongoDB Failed: ${err}`)
    }
}

export default connectDB