import express, { Express} from "express";

import moment from "moment";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import routesVersion1 from "./api/v1/routes/index.routes";



dotenv.config();

const app: Express = express();
const port: number = 3000;



//App use
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



routesVersion1(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});