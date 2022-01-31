import app from "../src/app";
import supertest, { SuperTest, Test } from "supertest";

export class Helper {
    public request: SuperTest<Test>;

    constructor() {
        this.request = supertest(app);
    }
}