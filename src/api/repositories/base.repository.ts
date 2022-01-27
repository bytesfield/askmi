import { IRead } from '../../interfaces/read.interface';
import { IWrite } from '../../interfaces/write.interface';

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {

    protected _model: any;

    constructor(model: any) {
        this._model = model;
    }

    public async create(item: T): Promise<T> {
        const result = await this._model.create(item);

        return result;
    }

    public async update(id: number, item: T): Promise<T> {
        const result = await this._model.update(item, { where: { id: id } });

        return result;
    }

    public async delete(id: number): Promise<boolean> {
        const result = await this._model.destroy({ where: { id: id } });

        return result;
    }
    public async find(item: T): Promise<T[]> {
        const result = this._model.findAll();

        return result;
    }

    public async findOne(id: number): Promise<T> {
        const result = await this._model.findOne({ where: { id: id } });

        return result;
    }

} 