import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import NotFound from './pages/PageNotFound/index';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Home } />
            </Switch>
        </BrowserRouter>
    )
}