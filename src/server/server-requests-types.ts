import { Request } from 'express';

export interface OpenProjectRequest {
    projectKeyToOpen: string;
}
export function parseOpenProjectRequest(req: Request): OpenProjectRequest {
    return {
        projectKeyToOpen: req.params.projectKeyToOpen
    };
}
