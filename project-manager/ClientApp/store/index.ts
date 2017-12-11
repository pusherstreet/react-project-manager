import * as Home from './Home';
import * as Auth from './Auth';
import * as Board from './Board';

// The top-level state object
export interface ApplicationState {
    home: Home.HomeState;
    auth: Auth.AuthState;
    board: Board.BoardState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    home: Home.reducer,
    auth: Auth.reducer,
    board: Board.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
