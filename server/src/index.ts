import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import config             from 'config';
import morgan             from 'morgan';

import cors               from 'cors';
import express,
       { Request,
         Response,
         NextFunction }   from "express";
import bodyParser         from 'body-parser';
import fileUpload         from 'express-fileupload';
import compression        from 'compression';

import DataSource         from '@/datasource';

import apiRoutes          from 'routes/api';
import initContext        from 'middleware/init-context.middleware';
import handleErrors       from 'middleware/handle-errors.middleware';
import { accessLogger,
         LoggerFactory }  from '@/logger';

const logger = LoggerFactory('index.ts')

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

    app.use(cors({
      credentials: true,
      exposedHeaders: [ 'Access-Token' ]
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(fileUpload({ createParentPath: true }));
    
    app.use(compression({ filter: shouldCompress }));
    
    app.use(morgan('combined', { stream: accessLogger.stream }));

    logger.info(`static path: ${config.get('server.staticPath')}`);
    app.use(express.static(config.get('server.staticPath')));

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
    app.listen(port, () => {
      console.log();
      console.log('      ##    ###    ##    ## ##     ##  ######  ');
      console.log('      ##   ## ##   ###   ## ##     ## ##    ## ');
      console.log('      ##  ##   ##  ####  ## ##     ## ##       ');
      console.log('      ## ##     ## ## ## ## ##     ##  ######  ');
      console.log('##    ## ######### ##  #### ##     ##       ## ');
      console.log('##    ## ##     ## ##   ### ##     ## ##    ## ');
      console.log(' ######  ##     ## ##    ##  #######   ######  ');
      console.log();
      console.log('Copyright (c) 2021-26 by ToalMoal Private Ltd.');
      console.log();

      console.log(`Janus server ver#${process.env.JANUS_VERSION} started on port ${port}!`);
      logger.info(`Janus server ver#${process.env.JANUS_VERSION} started on port ${port}!`);
    });
  })
  .catch((error: any) => {
    console.error(error);
    logger.error(error);
  });