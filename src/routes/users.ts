import express, { Request, Response, NextFunction, Router } from "express";

let router: Router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("respond with a resource");
});

export = router;
