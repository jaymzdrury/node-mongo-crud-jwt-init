import {Application} from 'express'
import userRoutes from './routes/user.routes'
import sessionRoutes from './routes/session.routes'
import dataRoutes from './routes/data.routes'

function routeHandler(app: Application){
    app.use('/', dataRoutes)
    app.use('/', userRoutes)
    app.use('/', sessionRoutes)
}
export default routeHandler