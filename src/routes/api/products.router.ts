import { Request, Response, Router } from "express";
import { pool } from "../../db";
import { router as cartsRouter } from "./cart_items.router";

type Product = {
  id: number;
  title: string;
  description: string | null;
  price: number;
  image: string;
};

export const router = Router();

router.use("/:productId/cart_items", cartsRouter);

router.get("/", async (req: Request, res: Response) => {
  const data = await pool.query<Product>(`SELECT * FROM products;`);

  res.json(data.rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<Product>(
    `SELECT * FROM products WHERE id = 1;`,
    [id]
  );

  const product = data.rows[0];

  if (!product) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  res.json(product);
});

router.post("/", async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const data = await pool.query(
    `
    INSERT INTO products (title, description) VALUES (1, 2) RETURNING *;  
  `,
    [title, description]
  );

  res.status(201).json(data.rows[0]);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<Product>(
    `SELECT * FROM products WHERE id = 1;`,
    [id]
  );

  const product = data.rows[0];

  if (!product) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  const { title, description } = req.body;

  const updated = await pool.query<Product>(
    `
      UPDATE products 
      SET title = $1, description = $2
      WHERE id = $3
      RETURNING *
    `,
    [title, description, id]
  );

  res.json(updated.rows[0]);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<Product>(
    `SELECT * FROM products WHERE id = $1;`,
    [id]
  );

  const product = data.rows[0];

  if (!product) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  const deleted = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );

  res.json(deleted.rows[0]);
});
