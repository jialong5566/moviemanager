import React from 'react';
import Layout from "./pages/Layout";
import {BrowserRouter as Router,Route} from "react-router-dom";
import './App.css';
import {Provider} from "react-redux";
import {store} from "./redux/store"

const App: React.FC = () => {
  return (
      <Provider store={store}>
      <Router>
        <Route path="/" component={Layout}></Route>
      </Router>
      </Provider>
  );
}

export default App;
