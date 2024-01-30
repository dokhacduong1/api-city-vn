import express, { Express} from "express";

import dotenv from "dotenv";
import cors from "cors"
import bodyParser from "body-parser";
import routesVersion1 from "./api/v1/routes/index.routes";



dotenv.config();

const app: Express = express();
const port: number = 3000;



//App use
//Cấu hình cors để tên miền nào được truy cập,mặc định không truyền là cho phép tất cả
app.use(cors(
  {
    origin:"*",
    methods:["POST","GET","DELETE","PUT","PATCH","OPTIONS"]
  }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



routesVersion1(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});