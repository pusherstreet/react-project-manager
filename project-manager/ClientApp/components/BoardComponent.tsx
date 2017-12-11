import * as React from 'react'
import Board from 'react-trello';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import {AuthState} from '../store/Auth';
import * as BoardStore from '../store/Board';

type BoardProps = RouteComponentProps<{}> & BoardStore.BoardState & AuthState & typeof BoardStore.actionCreators;

class BoardComponent extends React.Component<BoardProps, {}> {
	public componentWillMount() {
        this.props.loadBoards() ;
	}
	
	handleDragEnd = (cardid: any, source: any, target: any) => {
		this.props.moveCard(cardid, source, target);
	}
    render() {
		
        return <div>
			<h1>Board</h1>
			<Board data={this.props.boards} draggable={true} handleDragEnd={this.handleDragEnd} style={{background: "white"}} />
		</div>  
		
    }
}
export default connect(
	(state: ApplicationState) => state.board,
	BoardStore.actionCreators
)(BoardComponent) as typeof BoardComponent