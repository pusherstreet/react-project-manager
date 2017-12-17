import * as React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import Layout from './components/Layout';
import Home from './components/Home';
import BoardComponent from './components/BoardComponent';
import GanttComponent from './components/GanttComponent';
import Table from './components/Table';


export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/board' component={BoardComponent} />
    <Route exact path='/gantt' component={GanttComponent} />
    <Route exact path='/table' component={Table} />
</Layout>;
