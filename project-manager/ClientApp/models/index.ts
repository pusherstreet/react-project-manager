export interface Task {
    taskID: number;
    title: string;
    description: string;
    created: Date;
    start: Date;
    end: Date;
    statusID: number;
    status: any;
}

export interface Status{
    statusID: number;
    name: string;
}

export interface BoardModel{
    key: Status;
    value: Task[];
}