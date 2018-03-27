import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as HomeStore from '../store/Home';
import { actionCreators } from '../store/Auth';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/home.css';
import BigCalendar from 'react-big-calendar';
import * as moment from 'moment';
import TaskModal from './TaskModal';
import { Button } from 'react-bootstrap';
import AddTaskModal from './AddTaskModal';
import {GoogleImport} from '../helpers/import';
import * as Project from '../store/Project';

type HomeProps = ApplicationState & typeof HomeStore.actionCreators & typeof actionCreators & RouteComponentProps<{}> & Project.ProjectState & typeof Project.actionCreators;
BigCalendar.momentLocalizer(moment);

class Home extends React.Component<HomeProps, {}> {
    componentDidMount(){
        this.props.loadData();
    }
    public render() {
        let tasks = this.props.project.tasks.map(el => {
            return {
                id: el.taskID,
                title: el.title,
                start: new Date(el.start.toString()),
                end: new Date(el.end.toString())
            }
        })
        
        return <div>

            <h1>Calendar</h1>
            <div className="top-panel">
                <AddTaskModal  onAdd ={this.props.addTask}/>
            </div>
            
            <BigCalendar events={tasks} onSelectEvent={(event) => this.props.selectTask(event.id)} startAccessor='start' endAccessor='end' style={{ height: 800 }} />
            <TaskModal />
        </div>
    }
}


export default connect(
    (state: ApplicationState) => state,
    { loadData: Project.actionCreators.loadTasks, 
        login: actionCreators.login, 
        selectTask: HomeStore.actionCreators.selectTask,
        addTask :  Project.actionCreators.addTask}
)(Home) as typeof Home;
