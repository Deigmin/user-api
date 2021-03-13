import express, { Request, Response, NextFunction, Router } from "express";
import { Auth } from "../controllers/user-api";

let router: Router = express.Router();

router.post("/", Auth.auth);

export = router;
