import { BaseModel } from "../Model/BaseModel";

export abstract class BaseDAO {

    public abstract async FindAll(top: number, skip: number): Promise<BaseModel[]>;
    public abstract async FindById(id: string): Promise<BaseModel>;
}