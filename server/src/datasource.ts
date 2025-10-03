import config         from 'config';

import 'reflect-metadata';
import { DataSource } from "typeorm";

export default new DataSource(config.get('persist'));