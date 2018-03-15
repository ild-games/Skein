export interface IResponseType {
    [key: string]: any;
}

export interface NewProjectResponse extends IResponseType {
    newProjectRoot: string;
}

export interface OpenProjectResponse extends IResponseType {
    message: string;
}

export type ProjectSelection = { name: string, root: string };
export interface RecentProjectsResponse extends IResponseType {
    recentProjects: ProjectSelection[];
}
