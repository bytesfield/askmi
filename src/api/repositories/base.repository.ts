import { IRead } from '../../interfaces/read.interface';
import { IWrite } from '../../interfaces/write.interface';

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {

    protected _model: any;

    constructor(model: any) {
        this._model = model;
    }

    /**
     * Creates a new Model Instance to DB
     * 
     * @param item 
     * @returns Promise<T>
     */
    public async create(item: T): Promise<T> {
        const result = await this._model.create(item);

        return result;
    }

    /**
     * Updated a Model
     * 
     * @param id 
     * @param item 
     * @returns Promise<T>
     */
    public async update(id: number, item: T): Promise<T> {
        const result = await this._model.update(item, { where: { id: id } });

        return result;
    }

    /**
     * Delete a Model
     * @param id 
     * @returns Promise<boolean>
     */
    public async delete(id: number): Promise<boolean> {
        const result = await this._model.destroy({ where: { id: id } });

        return result;
    }

    /**
     * Find All Result of a Model
     * @param item 
     * @returns Promise<T[]>
     */
    public async find(item: T): Promise<T[]> {
        const result = this._model.findAll();

        return result;
    }

    /**
     * Find One Result of a Model
     * @param id 
     * @returns Promise<T[>
     */
    public async findOne(id: number): Promise<T> {
        const result = await this._model.findOne({ where: { id: id } });

        return result;
    }

} 