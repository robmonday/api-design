import { Router } from "express";

const router = Router();

router.get("/product", (req, res) => {
  res.json({ message: "product" });
});

// Product

router.get("/product/:id", () => {});

router.put("/product/:id", () => {});

router.post("/product/:id", () => {});

router.delete("/product/:id", () => {});

// Update

router.get("/update/:id", () => {});

router.put("/update/:id", () => {});

router.post("/update/:id", () => {});

router.delete("/update/:id", () => {});

// Update Points

router.get("/updatepoints/:id", () => {});

router.put("/updatepoints/:id", () => {});

router.post("/updatepoints/:id", () => {});

router.delete("/updatepoints/:id", () => {});

export default router;
