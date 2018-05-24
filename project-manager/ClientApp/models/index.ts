export interface Task {
    taskID: number;
    title: string;
    description: string;
    created: Date;
    start: Date;
    end: Date;
    statusID: number;
    status: any;
    User: User,
    UserID: string,
    effort: number
}

export interface Status{
    statusID: number;
    name: string;
}

export interface BoardModel{
    key: Status;
    value: Task[];
}

export interface GoogleEvent{
    ID: string;
    Created: Date;
    Creator: GoogleUser;
    Start: Date;
    End: Date;
    Organizer: GoogleUser;
    Status: string;
    Summary: string;
}

export interface GoogleUser{
    Email: string;
    DisplayName: string;
    Self: boolean;
}

export interface Configuration{
    UserID: string,
    ConfigurationID: number,
    Theme: string,
    Notifications: boolean
}
export interface User{
    userID: string,
    email: string
}
export interface TaskHistory{
    taskHistoryID: number,
    message: string,
    created: Date,
    userID: string,
    user: User,
    taskID: number,
    changes: any[]
}
export interface TaskChange{
    fieldName: string,
    oldValue: any,
    newValue: any,
    created: Date
}