import { Request } from 'express';
import { RecentProjectsResponse, ProjectSelection } from './server-response-types';

export interface IRequestType {
    [key: string]: any;
}

export interface OpenRecentProjectRequest extends IRequestType {
    recentProjectToOpen: ProjectSelection;
}
