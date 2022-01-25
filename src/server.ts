
import app from "./app";
import dotenv from "dotenv";
import config from "./config/index";

dotenv.config();

const appName = config.app.name;
//const port = config.app.port;
const port = 3000;

app.listen(port, () => {
    console.log(`${appName} server is running on ${config.app.env} at port ${port}`);
});