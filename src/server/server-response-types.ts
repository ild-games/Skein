export interface IResponseType {
    [key: string]: string;
}

export interface NewProjectResponse extends IResponseType {
    newProjectKey: string;
}

export interface OpenProjectResponse extends IResponseType {
    message: string;
}
