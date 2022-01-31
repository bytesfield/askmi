import { BaseRepository } from "./base.repository";
import db from "../../database/models";

// now, we have all code implementation from BaseRepository
export class CommentRepository extends BaseRepository<typeof db.Comment>{


}
