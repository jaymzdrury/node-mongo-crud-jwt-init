import {Application} from 'express'
import userRoutes from './routes/user.routes'
import sessionRoutes from './routes/session.routes'

function routeHandler(app: Application){
    app.use('/', userRoutes)
    app.use('/', sessionRoutes)
}
export default routeHandler