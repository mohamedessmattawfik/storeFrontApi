import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app: express.Application = express();
const port: string = "3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.use("/api", routes);

app.listen(port, function () {
  console.log(`starting app on: ${port} 🚀🚀🚀`);
});
