import { IRead } from '../../interfaces/read.interface';
import { IWrite } from '../../interfaces/write.interface';

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {

    protected _model: any;

    constructor(model: T) {
        this._model = model;
    }

    /**
     * Creates a new Model Instance to DB
     * 
     * @param T item 
     * 
     * @returns Promise<T>
     */
    public async create(item: T): Promise<T> {
        return await this._model.create(item);
    }

    /**
     * Updated a Model
     * 
     * @param number id 
     * @param T item 
     * 
     * @returns Promise<T>
     */
    public async update(id: number, item: T): Promise<T> {
        return await this._model.update(item, { where: { id: id } });
    }

    /**
     * Delete a Model
     * 
     * @param number id 
     * 
     * @returns Promise<boolean>
     */
    public async delete(id: number): Promise<boolean> {
        return await this._model.destroy({ where: { id: id } });
    }

    /**
     * Delete a Model with multiple
     * 
     * @param object obj 
     * 
     * @returns Promise<boolean>
     */
    public async deleteMultiple(obj: object): Promise<boolean> {
        return await this._model.destroy({ where: obj });
    }

    /**
     * Find All Result of a Model
     * 
     * @param T item 
     * 
     * @returns Promise<T[]>
     */
    public async find(item: T): Promise<T[]> {
        return this._model.findAll();
    }

    /**
     * Find One Result of a Model
     * 
     * @param number id 
     * 
     * @returns Promise<T>
     */
    public async findOne(id: number): Promise<T> {
        return await this._model.findOne({ where: { id: id } });
    }

    /**
     * Find One Result of a Model with multiple conditions
     * 
     * @param object obj 
     * 
     * @returns Promise<T>
     */
    public async findByMultiple(obj: object): Promise<T> {
        return await this._model.findOne({ where: obj });
    }

} 