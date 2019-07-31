import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {MovieService} from "./service/MovieService";
import "antd/dist/antd.css"

import {store} from "./redux/store";
import MovieAction from "./redux/actions/MovieAction";
// store.dispatch(MovieAction.setLoadingAction(true));
// store.dispatch(MovieAction.fetchMovies({page:1,limit:2}));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// MovieService.add({
//     name:"aaa",
//     duration:20,
//     areas:["usa"],
//     types:["war"]
// }).then(res=>{
//     console.log(res)
// })
