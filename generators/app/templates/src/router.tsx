import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import {
    HomePage
} from './routes';


const a = (
    <div></div>
)

function RouterConfig({ history }) {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                </Switch>
            </Router>
        </div>
    );
}

export default RouterConfig;
