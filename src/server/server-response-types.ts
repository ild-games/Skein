export interface IResponseType {
    [key: string]: any;
}

export interface NewProjectResponse extends IResponseType {
    newProject: ProjectSelection;
}

export interface OpenProjectResponse extends IResponseType {
    openedProject: ProjectSelection;
}

export interface ProjectSelection {
    name: string;
    root: string;
}
export interface RecentProjectsResponse extends IResponseType {
    recentProjects: ProjectSelection[];
}
