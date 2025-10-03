import path             from 'path';
import winston          from 'winston';

import split            from 'split';
import config           from 'config';

import DailyRotateFile  from 'winston-daily-rotate-file';

// cache of loggers with different labels
const loggerInstances = new Map<string, winston.Logger>();

const LoggerFactory = (label: string) => {
  if (loggerInstances.get(label) != null) {
    return loggerInstances.get(label);
  } else {
    const logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.label({ label: path.basename(label) }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(
              info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`,
            )
          )
        }),
        new DailyRotateFile({
          filename: `${config.get('server.logsPath')}/%DATE%.log`,
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
    loggerInstances.set(label, logger);
    return logger;
  }

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
      filename: `${config.get('server.logsPath')}/access-%DATE%.log`,
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

accessLogger.stream = split()
  .on('data', function (message) {
    accessLogger.info(message);
  });

export { LoggerFactory, accessLogger };
