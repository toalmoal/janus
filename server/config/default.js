const defer = require('config/defer').deferConfig;

module.exports = {
  server: {
    port: 80,
    sharedPath: '/opt/janus/shared',
    staticPath: defer(function () {
      return this.server.sharedPath + '/resources/static';
    }),
    logsPath: defer(function () {
      return this.server.sharedPath + '/var/logs';
    })
  },
  persist: {
    type: 'mariadb',
    logging: 'error', // true
    host: 'localhost',
    port: 3306,
    synchronize: false,
    username: 'janus',
    password: '',
    database: 'janus',
    bigNumberStrings: false,
    entities: [ './entity/**/*{.ts,.js}' ],
    migrations: [ "migration/**/*{.ts,.js}" ],
    subscribers: []
  },
  crypto: {
    ivLength: 16,
    algorithm: 'aes-256-ctr',
    secret: '@&hY!0jWyq^6$7q*J5TWxy!03o$t8Mg%'
  }
}
