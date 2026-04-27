import 'reflect-metadata';

import config                               from 'config';

import { DataSource as TypeOrmDataSource }  from "typeorm";

export const DataSource = new TypeOrmDataSource(config.get('persist'));
