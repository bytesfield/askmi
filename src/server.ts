
import app from "./app";
import dotenv from "dotenv";
import config from "./config/index";
import db from "./database/models";
//import seedUsers from "./database/seeders/users";

dotenv.config();

const appName = config.app.name;
//const port = config.app.port;
const port = 3000;

//seedUsers();

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`${appName} server is running on ${config.app.env} at port ${port}`);
    });
}).catch((err: Error) => {
    console.log(err);
});

