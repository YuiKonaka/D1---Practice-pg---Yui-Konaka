import { Request, Response, Router } from "express";
import { pool } from "../../db";

export const router = Router({ mergeParams: true });

router.get("/", async (req: Request, res: Response) => {
  const { productId } = req.params;

  const productData = await pool.query("SELECT * FROM projects WHERE id = $1", [
    productId,
  ]);

  const product = productData.rows[0];

  if (!product) {
    res.status(404).json({
      error: 404,
      message: `project with id ${productId} does not exist`,
    });
    return;
  }

  const cartData = await pool.query(
    "SELECT * FROM carts WHERE product_id = $1",
    [productId]
  );

  res.json(cartData.rows);
});

router.get("/:cartId", async (req: Request, res: Response) => {
  const { productId, cartId } = req.params;

  const productData = await pool.query("SELECT * FROM products WHERE id = $1", [
    productId,
  ]);

  const product = productData.rows[0];

  if (!product) {
    res.status(404).json({
      error: 404,
      message: `product with id ${productId} does not exist`,
    });
    return;
  }

  const cartData = await pool.query(
    "SELECT * FROM carts WHERE id = $1 AND product_id = $2",
    [cartId, productId]
  );

  const cart = cartData.rows[0];

  if (!cart) {
    res.status(404).json({
      error: 404,
      message: `task with id ${cartId} does not exist`,
    });
    return;
  }

  res.json(cart);
});

router.post("/", async (req: Request, res: Response) => {
  const { productId } = req.params;

  const productData = await pool.query("SELECT * FROM products WHERE id = $1", [
    productId,
  ]);

  const product = productData.rows[0];

  if (!product) {
    res.status(404).json({
      error: 404,
      message: `product with id ${productId} does not exist`,
    });
    return;
  }

  const { title, description } = req.body;

  const cartData = await pool.query(
    "INSERT INTO carts (product_id, title, description) VALUES ($1, $2, $3) RETURNING *",
    [productId, title, description]
  );

  res.json(cartData.rows[0]);
});

router.put("/:cartId", async (req: Request, res: Response) => {
  const { productId, cartId } = req.params;

  const productData = await pool.query("SELECT * FROM products WHERE id = $1", [
    productId,
  ]);

  const product = productData.rows[0];

  if (!product) {
    res.status(404).json({
      error: 404,
      message: `product with id ${productId} does not exist`,
    });
    return;
  }

  const cartData = await pool.query(
    "SELECT * FROM tasks WHERE id = $1 AND project_id = $2",
    [cartId, productId]
  );

  const cart = cartData.rows[0];

  if (!cart) {
    res.status(404).json({
      error: 404,
      message: `cart with id ${cartId} does not exist`,
    });
    return;
  }

  const { title, description, start_time, end_time } = req.body;

  const updated = await pool.query(
    `
      UPDATE carts 
      SET title = $1, description = $2, start_time = $3, end_time = $4 
      WHERE id = $5 AND project_id = $6
      RETURNING *;
    `,
    [title, description, start_time, end_time, cartId, productId]
  );

  res.json(updated.rows[0]);
});

router.delete("/:cartId", async (req: Request, res: Response) => {
  const { productId, cartId } = req.params;

  const productData = await pool.query("SELECT * FROM products WHERE id = $1", [
    productId,
  ]);

  const product = productData.rows[0];

  if (!product) {
    res.status(404).json({
      error: 404,
      message: `product with id ${productId} does not exist`,
    });
    return;
  }

  const cartData = await pool.query(
    "SELECT * FROM tasks WHERE id = $1 AND project_id = $2",
    [cartId, productId]
  );

  const cart = cartData.rows[0];

  if (!cart) {
    res.status(404).json({
      error: 404,
      message: `cart with id ${cartId} does not exist`,
    });
    return;
  }

  const client = await pool.connect();

  await client.query("BEGIN");

  const deletedData = await client.query(
    "DELETE FROM carts WHERE id = $1 AND product_id = $2 RETURNING *;",
    [cartId, productId]
  );

  if (deletedData.rows.length > 1) {
    await client.query("ROLLBACK");

    res.status(500).json({
      error: 500,
      message: `something went wrong while deleting the cart with id ${cartId}`,
    });
    return;
  }

  await client.query("COMMIT");

  res.json(deletedData.rows[0]);
});
