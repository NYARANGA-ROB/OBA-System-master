import express from "express";
import { generateReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/generateReport/:id", generateReport);

export default router;
