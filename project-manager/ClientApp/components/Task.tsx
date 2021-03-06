import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as TaskStore from '../store/Task';
import HistoryList from './Controls/HistoryList';

type TaskProps = RouteComponentProps<{id:number}> & ApplicationState & typeof TaskStore.actionCreators;

class Task extends React.Component<TaskProps, {comment: string}>{
    constructor(){
        super();
        this.state = {comment: ''};
    }
    componentDidMount(){
        this.props.load(this.props.match.params.id);
        this.props.loadHistory(this.props.match.params.id);
    }
    componentWillUnmount(){
        if(this.props.task.taskChanges.length){
            confirm('Save changes?') && this.props.save(this.props.task.currentTask);
        }
    }
    registerChanges = (target) => {
        let htmlElement = target as HTMLFormElement;
        let prop, newValue, oldValue;
        const initial = this.props.task.initialTask;

        if(htmlElement.tagName == 'SELECT'){
            const selectElement = target as HTMLSelectElement;
            prop = selectElement.id;
            
            console.log(selectElement.options);

            newValue = selectElement.options[selectElement.selectedIndex].text;
            oldValue = selectElement.options.namedItem(initial[selectElement.name]).text;
        }else{
            prop = htmlElement.name;
            newValue = htmlElement.value;
            oldValue = initial[prop];
        }
        const changes = this.props.task.taskChanges;

        if(oldValue == newValue){
            this.props.registerChange(prop, 'remove');
        }else if(changes.findIndex(el => el.fieldName == prop) !== -1){
            this.props.registerChange(prop, 'update', newValue);
        }else{
            this.props.registerChange(prop, 'insert', newValue, oldValue);
        }
    }
    changeTask = (event) => {
        this.registerChanges(event.target);
        let target = event.target as HTMLFormElement;
        this.props.change(target.name, target.value);
    }
    addComment = () => {
        this.setState({comment: ''}); 
        this.props.addComment(this.state.comment, this.props.task.currentTask.taskID);
    }
    changeComment = (event) => {
        let target = event.target as HTMLFormElement;
        this.setState({comment: target.value});
    }
    render(){
        return <div>
            <h2>
                Task #{this.props.match.params.id} &nbsp;&nbsp;
                {this.props.task.currentTask && this.props.task.currentTask.title}
                <span style={{ display: this.props.task.taskChanges.length ? 'inline': 'none'}}>*</span>
            </h2>
            {this.props.task.currentTask &&
            <div>
             <table className="table task-edit">
              <tbody>
                <tr>
                    <td>
                        <label htmlFor="title">TITLE</label>
                    </td>
                    <td><input name="title" onChange={this.changeTask} className="form-control" id="title" value={this.props.task.currentTask.title} type="text"/></td>
                </tr>
                <tr>
                    <td><label htmlFor="description">DESCRIPTION</label></td>
                    <td><textarea name="description" onChange={this.changeTask} id="description" cols={30} rows={4} className="form-control" value={this.props.task.currentTask.description}></textarea></td>
                </tr>
                <tr>
                  <td><label htmlFor="statusID">Status</label></td>
                  <td>
					<select id="Status" name="statusID" value={this.props.task.currentTask.statusID} onChange={this.changeTask} style={{width: "100%"}} >
						<option name="1" value="1">Done</option>
						<option name="2" value="2">Created</option>
                        <option name="3" value="3">Canceled</option>
                        <option name="4" value="4">Approved</option>
					</select>
					</td>
                </tr>
                <tr>
                    <td><label htmlFor="effort">Effort</label></td>
                    <td><input name="effort" id="effort" type="number" value={this.props.task.currentTask.effort} onChange={this.changeTask}/></td>
                </tr>
                <tr>
                    <td><label htmlFor="userID">Assigned to</label></td>
                    <td>
                        <select name="userID" id="User" value={this.props.task.currentTask.UserID} onChange={this.changeTask}>
                        {
                            this.props.project.users.map(user => {
                                return <option name={user.userID} value={user.userID}>{user.email}</option>
                            })
                        }
                        </select>
                    </td>
                </tr>
            </tbody>
            </table>
            <div>
                <button onClick={() => { this.props.save(this.props.task.currentTask, this.props.task.taskChanges) }} className="btn btn-success">Save</button>
            </div>
            </div>
            
            }
           <div className={"save-message " + (this.props.task.showSaveMessage ? '' : 'hide')}>Changes saved</div>
           <h2>History</h2>
           <div className="comment-block">
            <textarea name="comment" id="comment" value={this.state.comment} onChange={this.changeComment} className="form-control" rows={4} placeholder="Type your comment here"></textarea>
            <div><button onClick={this.addComment}className="btn btn-success">Add comment</button></div>
           </div>
           <HistoryList historyList={this.props.task.historyList} />
        </div>
    }
}

export default connect (
(state: ApplicationState) => state,
TaskStore.actionCreators
)(Task) as typeof Task;