import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import cors from "cors";

const app: express.Application = express();
const port: string = "3000";

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.use("/api", routes);

app.listen(port, function () {
  console.log(`starting app on: ${port} 🚀🚀🚀`);
});

export default app;
