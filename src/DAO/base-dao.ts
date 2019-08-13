import { BaseModel } from "../Model/base-model";

export abstract class BaseDAO {

    abstract async findById(id: string): Promise<BaseModel>;
    abstract async findAll(top: number, skip: number): Promise<BaseModel[]>;
    abstract async create(model: BaseModel): Promise<BaseModel>;
    abstract async overwrite(id: string, model: BaseModel): Promise<BaseModel>;
    abstract async update(id: string, model: BaseModel): Promise<BaseModel>;
    abstract async delete(id: string): Promise<BaseModel>;
}