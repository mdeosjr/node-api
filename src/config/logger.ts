import pino from 'pino';

const getTransport = (nodeEnv?: string) => {
  switch (nodeEnv) {
    case 'development':
      return pino.transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
          ignore: 'pid,hostname',
        },
      });

    case 'test':
      return undefined;

    case 'production':
      return pino.transport({
        target: 'pino/file',
        options: {
          destination: 1,
        },
      });

    default:
      return pino.transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        },
      });
  }
};

const getLogLevel = (nodeEnv?: string) => {
  switch (nodeEnv) {
    case 'development':
      return 'debug';
    case 'test':
      return 'silent';
    default:
      return 'info';
  }
};

const logLevel = getLogLevel(process.env.NODE_ENV);
const transport = getTransport(process.env.NODE_ENV);

export const logger = pino(
  {
    level: logLevel,
    base: undefined,
  },
  transport
);

export default logger;
