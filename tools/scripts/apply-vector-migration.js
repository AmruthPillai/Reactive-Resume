const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const runMigration = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Ensure this environment variable is set
    password: process.env.POSTGRES_PASSWORD, // Ensure this environment variable is set
    user: process.env.POSTGRES_USER, // Ensure this environment variable is set
    database: process.env.POSTGRES_DB, // Ensure this environment variable is set
  });

  try {
    await client.connect();

    const sql = fs.readFileSync(path.join(__dirname, "../postgres/pgvectorCreate.sql"), "utf8");
    await client.query(sql);

    console.log("Additional migration applied successfully.");
  } catch (err) {
    console.error("Error applying additional migration:", err);
  } finally {
    await client.end();
  }
};

runMigration().catch((err) => {
  console.error("Error applying additional migration:", err);
  process.exit(1);
});
