import * as React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import Layout from './components/Layout';
import Home from './components/Home';
import BoardComponent from './components/BoardComponent';


export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/board' component={BoardComponent} />
</Layout>;
