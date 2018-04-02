import * as React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import Layout from './components/Layout';
import Home from './components/Home';
import BoardComponent from './components/BoardComponent';
import GanttComponent from './components/GanttComponent';
import Table from './components/Table';
import Import from './components/Import';
import Export from './components/Export'
import Configuration from './components/Configuration';


export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/board' component={BoardComponent} />
    <Route exact path='/gantt' component={GanttComponent} />
    <Route exact path='/table' component={Table} />
    <Route exact path='/import' component={Import} />
    <Route exact path='/export' component={Export} />
    <Route exact path='/configuration' component={Configuration} />
</Layout>;
