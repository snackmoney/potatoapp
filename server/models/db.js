const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/potatoapp';
console.log("Db address: "+connectionString);

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE blob(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, description VARCHAR(100) not null)');
query.on('end', () => { client.end(); });
