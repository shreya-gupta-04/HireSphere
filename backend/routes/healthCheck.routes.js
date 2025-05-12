import { healthCheck } from "../controllers/healthCheck.controller.js";

import {Router}from "express";

const router = Router();

router.get("/health", healthCheck);

export default router;