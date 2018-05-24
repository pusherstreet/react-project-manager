import * as React from 'react';
import {TaskHistory} from '../models';

export const getTaskHistoryHtml = (taskHistory: TaskHistory) => {
    const changesCount = taskHistory.changes.length;

    const message = <span><b>{taskHistory.user.email} </b> added comment: "{taskHistory.message}" 
        {changesCount > 0 ? <span> and <b>{changesCount}</b> other <a href="#">{changesCount == 1 ? "change" : "changes"}</a></span> : ""}.</span>;
        
    return <div className='history-summary' key={taskHistory.taskHistoryID}>
    <div className="history-text-block">
        {message}
    </div>
    <div className="history-info-block">
    {new Date(taskHistory.created).toUTCString()}
    </div>
    
</div>
}