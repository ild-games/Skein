export interface IResponseType {
    [key: string]: string;
}

export interface NewProjectResponse extends IResponseType {
    newProjectHome: string;
}

export interface OpenProjectResponse extends IResponseType {
    message: string;
}
