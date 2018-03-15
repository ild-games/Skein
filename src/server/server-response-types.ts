export interface IResponseType {
    [key: string]: any;
}

export interface NewProjectResponse extends IResponseType {
    newProjectHome: string;
}

export interface OpenProjectResponse extends IResponseType {
    message: string;
}

export type RecentProject = { name: string, root: string };
export interface RecentProjectsResponse extends IResponseType {
    recentProjects: RecentProject[]
}
