import {Application} from 'express'
import routes from './routes/routes'

function routeHandler(app: Application){
    app.use('/', routes)
}
export default routeHandler