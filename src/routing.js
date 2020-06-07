import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import AppContent from './components';

export default function routes(){
    return (
        <Router>
            <Switch>
                <Route path="/page/:pageNumber" component={AppContent}  >
                </Route>
                <Route path="/">
                    <Redirect to="/page/1" />
                </Route>
            </Switch>
        </Router>
    )
}