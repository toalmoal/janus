module.exports = {
  server: {
    port: 8080,
    sharedPath: '../shared'
  },
  persist: {
    type: 'mysql',
    host: "localhost",
    password: "Qb!:@v)+4PG>Frq",
    entities: [ "src/entity/**/*{.ts,.js}" ]
  }
}
