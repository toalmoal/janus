import 'reflect-metadata';

import dotenv                 from 'dotenv';
dotenv.config();

import path                   from 'path';
import chalk                  from 'chalk';
import config                 from 'config';
import expressWinston         from 'express-winston';

import cors                   from 'cors';
import express,
       { Request,
         Response,
         NextFunction }       from "express";
import fileUpload             from 'express-fileupload';
import compression            from 'compression';

import { DataSource }         from '@/datasource';

import { apiRoutes }          from 'routes/api';
import { initContext }        from 'middleware/init-context.middleware';
import { handleErrors }       from 'middleware/handle-errors.middleware';
import { accessLogger,
         LoggerFactory }      from '@/logger';

const logger = LoggerFactory('index.ts')

// Helper to resolve lazy-evaluated config values
const getConfig = (path: string) => {
  const value = config.get(path);
  return typeof value === 'function' ? value() : value;
};

const HTML_ROOT = path.resolve(__dirname, 'web');

const shouldCompress = (request: Request, response: Response) => {
  if (request.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(request, response);
};

DataSource.initialize()
  .then(async () => {
    const app = express();

    app.all('*path', initContext);

    const corsOptions = {
      credentials: true,
      exposedHeaders: [ 'Access-Token' ]
    };
    app.disable('x-powered-by');

    app.use(cors(corsOptions));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
      expressWinston.logger({
        winstonInstance: accessLogger,
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        expressFormat: true,
        colorize: false
       }
      )
    );

    app.use(fileUpload({ createParentPath: true }));
    
    app.use(compression({ filter: shouldCompress }));

    logger.info(`static path: ${getConfig('server.staticPath')}`);
    app.use(express.static(getConfig('server.staticPath')));

    logger.info(`html path: ${HTML_ROOT}`);
    app.use(express.static(HTML_ROOT));

    app.use('/api', apiRoutes);

    app.use(function (req: Request, res: Response, next: NextFunction) {
      if (!req.path.startsWith('/api')) {
        res.removeHeader('Content-Security-Policy');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      }
      next();
    });

    app.use(handleErrors);
    
    const port = config.get('server.port');
    const server = app.listen(port, () => {
      console.log();
      console.log('      ##    ###    ##    ## ##     ##  ######  ');
      console.log('      ##   ## ##   ###   ## ##     ## ##    ## ');
      console.log('      ##  ##   ##  ####  ## ##     ## ##       ');
      console.log('      ## ##     ## ## ## ## ##     ##  ######  ');
      console.log('##    ## ######### ##  #### ##     ##       ## ');
      console.log('##    ## ##     ## ##   ### ##     ## ##    ## ');
      console.log(' ######  ##     ## ##    ##  #######   ######  ');
      console.log();
      console.log(chalk.blue('Copyright (c) 2021-2026 by ToalMoal Private Ltd.'));
      console.log();

      logger.info(`Janus server ver#${process.env.JANUS_VERSION} started on port ${port}!`);
    });
  })
  .catch((error: any) => {
    console.error(error);
    logger.error(error);
  });