import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import Progress from './components/Progress';
import { createBrowserHistory } from 'history';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
})

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setSignedIn] = useState(false);
    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn])
    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth" >
                                <AuthLazy onSignIn={() => setSignedIn(true)}></AuthLazy>
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />} <DashboardLazy />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
}