import * as React from 'react';
import { TaskHistory } from '../../models/index';

export default class HistoryList extends React.Component<{historyList: TaskHistory[]}, {}>{
    render(){
        return <div>
        {this.props.historyList.map((el: TaskHistory) => {
            return <div className='history-summary' key={el.taskHistoryID}>
                <div className="history-text-block">
                    <b>{el.user.email}:</b> {el.message}
                </div>
                <div className="history-info-block">
                {new Date(el.created).toUTCString()}
                </div>
                
            </div>
        })}
        </div>
    }
}