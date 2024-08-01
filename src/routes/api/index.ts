import { Router } from "express";
import { router as productsRouter } from "./products.router";

export const apiRouter = Router();

const ROUTER = [{ url: "/products", router: productsRouter }];

ROUTER.forEach(({ url, router }) => {
  apiRouter.use(url, router);
});
