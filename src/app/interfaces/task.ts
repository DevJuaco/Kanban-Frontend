export interface Todo {
    todo: string[];
}

export interface inProgress {
    inProgress: string[];
}

export interface finished {
    finished: string[];
}

export interface Task {
    id: string;
    name: string;
    status: number;
}
