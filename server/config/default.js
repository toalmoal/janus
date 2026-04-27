module.exports = {
  server: {
    port: 80,
    sharedPath: '/opt/janus/shared',
    get resourcesPath() {
      return this.sharedPath + '/resources';
    },
    get staticPath() {
      return this.resourcesPath + '/static';
    },
    get varPath() {
      return this.sharedPath + '/var';
    },
    get logsPath() {
      return this.varPath + '/logs';
    },
    get tempPath() {
      return this.varPath + '/temp';
    }
  },
  logs: {
    level: {
      file: 'debug',
      console: 'debug'
    }
  },
  persist: {
    type: 'mysql',
    logging: 'error', // true
    host: 'localhost',
    port: 3306,
    synchronize: false,
    username: 'janus',
    password: '',
    database: 'janus',
    bigNumberStrings: false,
    entities: [ './entity/**/*{.ts,.js}' ],
    migrations: [ 'migration/**/*{.ts,.js}' ],
    subscribers: []
  },
  crypto: {
    ivLength: 16,
    algorithm: 'aes-256-ctr',
    secret: '@&hY!0jWyq^6$7q*J5TWxy!03o$t8Mg%'
  },
  jwt: {
    version: 0,
    validDuration: '3m'
  }
}
