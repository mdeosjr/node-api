import cors from '@koa/cors';
import 'dotenv/config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import { logger } from './config/logger';
import { database } from './database';
import { errorMiddleware } from './middlewares/errorMiddleware';
import router from './routes';

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(bodyParser());
app.use(errorMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

const startServer = async () => {
  try {
    await database.connect();

    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        logger.info(`Server running on ${PORT}`);
      });
    }
  } catch (error) {
    logger.error({ error }, 'Failed to start server');
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
