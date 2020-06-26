import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from "redux-saga/effects";
import axios from 'axios';


//this will get all the movies to Home.js
function* getMovies() {
        const movies = yield axios.get('/movies');
        yield put({type: "SET_MOVIES", payload: movies.data})
    }

//I need a function that will get only one movie to Details.js
function* getDetails(action) {
        const details = yield axios.get(`/details/${action.payload}`);
        yield put({ type: "SET_DETAILS", payload: details.data })
    }

//from edit component this will help communicate with DB to edit
function* updateDetails(action){
       const editDetails = yield axios.put(`/edit/${action.payload}`);
        yield put({ type: "SET_EDIT", payload: editDetails.data })
    }


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery("GET_MOVIES", getMovies);
    yield takeEvery("GET_DETAILS", getDetails);
    yield takeEvery("EDIT_DETAILS", updateDetails);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

const edit = (state = [], action) => {
    switch (action.type) {
        case 'SET_EDIT':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
        edit,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
