import { BaseRepository } from "./base.repository";
import db from "../../database/models";

export class QuestionRepository extends BaseRepository<typeof db.Question>{


}
