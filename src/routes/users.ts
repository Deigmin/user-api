import express, { Request, Response, NextFunction, Router } from "express";
import { UserInteraction } from "../controllers/user-api";

let router: Router = express.Router();

router.get("/", UserInteraction.getAllUsers);
router.post("/", UserInteraction.signUp);
router.get("/:id", UserInteraction.getById);
router.put("/:id", UserInteraction.updateById);
router.delete("/:id", UserInteraction.deleteById);

export = router;
