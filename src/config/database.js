import 'dotenv/config';
import pkg from 'pg';
const { Client } = pkg;

if (typeof process.env.DB_PASSWORD !== 'string') {
    console.error("CRITICAL ERROR: DB_PASSWORD is missing or not a string. Check your .env file.");
    process.exit(1);
}

const dbCon = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

});

dbCon.connect()
  .then(() => {
      console.log("Database connected successfully!");
  })
  .catch((err) => {
      console.error("Database connection error:", err.message);
      process.exit(1);
  });

export default dbCon;