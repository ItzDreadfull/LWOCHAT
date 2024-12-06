import express from "express";
import protectRoute from "../midleware/protectRoute";
import getUserForSlidbar from "../controllers/user.controllers";


const router = express.Router();

router.get("/", protectRoute, getUserForSlidbar);

export default router;