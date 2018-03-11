import { Request } from 'express';

export interface IRequestType {
    [key: string]: string;
}

export interface OpenProjectRequest extends IRequestType {
    projectKeyToOpen: string;
}
export function parseOpenProjectRequest(req: Request): OpenProjectRequest {
    return {
        projectKeyToOpen: req.params.projectKeyToOpen
    };
}
