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
    UserID: string,
    Email: string
}
