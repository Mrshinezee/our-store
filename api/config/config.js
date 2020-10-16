require('dotenv').config();

export const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false
};
export const test = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.TEST_DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false
};
export const production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false
};
