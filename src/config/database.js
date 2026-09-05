import 'dotenv/config';
import pkg from 'pg';
const { Client } = pkg;

const dbCon = new Client({
  host:process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DB_CONNECTION_STRING
});

dbCon.connect()
  .then(() => {
      console.log("Database connected successfully!");
  })
  .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1);
  });
