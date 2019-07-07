declare namespace UserAPI {

    export abstract class BaseController {
        public abstract Save(model: UserAPI.Model.BaseModel): void;
        public abstract Load(id: string): UserAPI.Model.BaseModel;
        public abstract Delete(id: string): void;
    }
}