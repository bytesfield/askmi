import casual from "casual";
import db from "../models";

const users = [
    {
        id: casual.integer,
        firstName: casual.first_name,
        lastName: casual.last_name,
        username: casual.username,
        email: casual.email,
        password: casual.password
    },
    {
        id: casual.integer,
        firstName: casual.first_name,
        lastName: casual.last_name,
        username: casual.username,
        email: casual.email,
        password: casual.password
    }

];

const seedUsers = () => {
    users.map(user => {
        db.User.Create(user);
    });
}

export default seedUsers;

