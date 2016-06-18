'use strict';

import { Router } from 'director';
import { h, render, Component } from 'preact';
/** @jsx h */

import * as store from './data';
import views from './views';

class RouteManager extends Component {
    constructor () {
        super();
        this.state = {
            'path': '',
            'id': '',
            'week': ''
        };
    }

    componentWillMount () {
        const goHome = () => this.setState({
            'path': 'League',
            'id': '',
            'week': ''
        });
        const routes = {
            '/': goHome,
            '/roster/:id': id => this.setState({
                'path': 'Roster',
                id,
                'week': ''
            }),
            '/scores/:week': week => this.setState({
                'path': 'LiveScoring',
                'id': '',
                week
            }),
            '/players/:week': week => this.setState({
                'path': 'PlayerList',
                'id': '',
                week
            })
        };
        this.router = Router(routes);
        this.router.configure({
            strict: false,
            notfound () {
                goHome();
            }
            // html5history: true
        });
        this.router.init();
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.path !== this.state.path ||
                nextState.id !== this.state.id ||
                nextState.week !== this.state.week;
    }

    render ( props, state ) {
        console.log(this);
        let Route = state && views[ state.path ] || null;
        return (
            <div>
                <pre>{JSON.stringify(this.routes)}</pre>
                <pre>{JSON.stringify(props)}</pre>
                <pre>{JSON.stringify(state)}</pre>
                The route is:
                <Route {...state}/>
            </div>
        );
    }
}

render(
    // <Root store={store}>
        <RouteManager />,
    // </Root>,
    document.getElementById('main')
);
