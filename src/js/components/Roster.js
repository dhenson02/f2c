'use strict';
import { h, Component } from 'preact';
/** @jsx h */

export default class Roster extends Component {
    constructor ( props ) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps !== this.props;
    }

    componentWillMount () {
        // this.setState({});
    }

    render ( { players } ) {
        return (
            <div className="">
                Roster
            </div>
        );
    }
}
