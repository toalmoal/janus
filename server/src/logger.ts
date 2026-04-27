import winston          from 'winston';

import chalk            from 'chalk';
import config           from 'config';
import DailyRotateFile  from 'winston-daily-rotate-file';

// Helper to resolve lazy-evaluated config values
const getConfig = (path: string) => {
  const value = config.get(path);
  return typeof value === 'function' ? value() : value;
};

const baseLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    })
  ),
  transports: [
    new winston.transports.Console({
      level: getConfig('logs.level.console') ?? 'debug',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, source, stack, message }) => {
          return `${chalk.cyan(timestamp)} ${level} [${chalk.magenta(source)}]: ${stack ?? message}`;
        })
      )
    }),
    new DailyRotateFile({
      filename: `${getConfig('server.logsPath')}/%DATE%.log`,
      level: getConfig('logs.level.file') ?? 'debug',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
      handleExceptions: true,
      format: winston.format.json()
    })
  ],
  exitOnError: false
});

const LoggerFactory = (source: string) => {
  return baseLogger.child({ source });
};

const accessLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      level: 'error',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`,
        )
      )
    }),
    new DailyRotateFile({
      filename: `${getConfig('server.logsPath')}/access-%DATE%.log`,
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      json: true,
      handleExceptions: true
    })
  ],
  exitOnError: false
});

export { LoggerFactory, accessLogger };
