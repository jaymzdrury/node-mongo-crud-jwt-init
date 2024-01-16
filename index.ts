import express, {Application, Request, Response} from 'express'
import { IncomingMessage, Server, ServerResponse } from 'http'
import connectDB from './config/db'
import config from './config/config'
import cors, {CorsOptions} from 'cors'
import routes from './routeHandler'
import cookieParser from 'cookie-parser'
import logger from './utils/logger'
import responseTime from 'response-time'
import deserializeUser from './middleware/desrializeUser'
import {restResponseTimeHistogram, startMetricsServer} from './utils/metrics'
import {NotFoundError} from './errors/not-found'

config.config()
const app: Application = express();
const port: string | number = process.env.PORT || 5000;
connectDB()

const options: CorsOptions = {origin: process.env.ORIGIN}
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(deserializeUser);
app.use(
  responseTime((req: IncomingMessage, res: ServerResponse<IncomingMessage>, time: number) => {
    if(req?.url){
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.url,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
routes(app);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError()
})

startMetricsServer();

const server: Server<typeof IncomingMessage, typeof ServerResponse> = app.listen(port, () => {
  logger.info(`running on port ${port}`)
});

process.on('unhandledRejection', (err) => {
  logger.error(`Error: ${err}`);
  server.close(() => process.exit(1));
})

export {app}