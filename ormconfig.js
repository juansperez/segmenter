const RailsNamingStrategy = require("./src/utils/naming-strategies/railsNamingStrategy.util")
  .RailsNamingStrategy;

module.exports = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: "all",
  namingStrategy: new RailsNamingStrategy(),
  entities: ["src/models/**/*{.ts,.js}"],
  migrations: ["src/migrations/**/*{.ts,.js}"],
  subscribers: ["src/subscribers/**/*{.ts,.js}"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscribers",
  },
};
