import express, { Express, Request, Response } from "express";
import { validationResult, param, matchedData } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
app.use(express.static("public"));
const port = process.env.PORT;
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server testing");
});

app.get(
  "/blueprint/generate/:w/:h/",
  param("w").notEmpty().isInt(),
  param("w").notEmpty().isInt(),
  (req: Request, res: Response) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      let { w, h } = matchedData(req);
      res.send(`You sent: ${w} ${h}`);
    }
    res.send({ errors: result.array() });
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
