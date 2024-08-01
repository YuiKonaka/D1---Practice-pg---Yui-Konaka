import { client } from "..";

const run = async () => {
  try {
    await client.connect();

    await client.query(`
    DROP TABLE IF EXISTS cart_items CASCADE;

    DROP TABLE IF EXISTS users CASCADE;
    
    DROP TABLE IF EXISTS products CASCADE;
    
    CREATE TABLE
      users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL
      );
    
    CREATE TABLE
      products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        price INTEGER,
        description TEXT,
        image TEXT
      );
    
    CREATE TABLE
      cart_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (id),
        product_id INTEGER REFERENCES products (id),
        quantiy INTEGER NOT NULL
      );
    `);

    console.log(`table is generated`);
    console.log(`testing... if we can send query`);

    const data = await client.query(`SELECT * FROM products;`);

    console.log(
      `currently the product in database is ${JSON.stringify(data.rows)}`
    );

    console.log(`Successfully the table is generated and confirmed!`);
  } catch (err) {
    console.error(`Oh no... something has gone wrong see the error: ${err}`);
  }
};

run().then(() => client.end());
