import { IRead } from '../../interfaces/read.interface';
import { IWrite } from '../../interfaces/write.interface';
import { isNull } from '../../utils/helpers.util';

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
     * @param {object} condition 
     * 
     * @returns Promise<T[]>
     */
    public async find(condition?: object): Promise<T[]> {

        if (!isNull(condition)) {
            return this._model.findAll(condition);
        }

        return this._model.findAll();
    }

    /**
     * Find Results and count of a Model with condition
     * 
     * @param {object}} condition 
     * 
     * @returns Promise<T[]>
     */
    public async findAllWithCondition(condition: object): Promise<T[]> {
        return this._model.findAll(condition);
    }

    /**
     * Return the total items of a Model
     * 
     * @param {object} condition 
     * 
     * @returns Promise<number>
     */
    public async count(condition?: object): Promise<number> {
        if (!isNull(condition)) {
            return this._model.count({ where: { condition } });
        }

        return this._model.count();
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