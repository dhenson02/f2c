'use strict';
import { h, Component } from 'preact';
import { league } from '../data';
import Loader from './Loader';
/** @jsx h */

export default class League extends Component {
    constructor ( props ) {
        super(props);
        this.state = league.getState();
        league.on('change', data => this.setState(data.getState()));
    }

    /*shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.store.equals(this.props.store);
    }*/

    componentWillMount () {
        if ( league.getState().size === 0 || this.props.forceReload === true ) {
            league.grabData('load league settings');
        }
    }

    render ( props, state ) {
        if ( !state ) {
            return <Loader visible={true} />;
        }
        return (
            <div className="">
                Home Screen
                <pre>{JSON.stringify(state.toObject())}</pre>
            </div>
        );
    }
}
