'use strict';

import { Router } from 'director';
import { h, render, Component } from 'preact';
import TeamSelector from './components/TeamSelector';
// import data from './data';
/** @jsx h */

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
            '/franchise/:id': {
                '/roster': {
                    'on': id => this.setState({
                        'path': 'Roster'
                    })
                },
                'on': id => this.setState({
                    'path': 'Franchise',
                    id
                })
            },
            '/scores/:week': week => this.setState({
                'path': 'LiveScoring',
                week
            }),
            '/players/:week': week => this.setState({
                'path': 'PlayerList',
                week
            })
        };
        this.router = Router(routes);
        this.router.configure({
            strict: false,
            notfound: goHome,
            html5history: true
        });
        this.router.init();
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.path !== this.state.path ||
                nextState.id !== this.state.id ||
                nextState.week !== this.state.week;
    }

    render ( props, state ) {
        let Route = views[ state.path ] || null;
        // let store = data[ state.path ] || null;
        return (
            <div>
                <TeamSelector router={this.router} />
                <Route {...state} />
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
