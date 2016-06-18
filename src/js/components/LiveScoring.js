'use strict';
import { h, Component } from 'preact';
/** @jsx h */

export default class LiveScoring extends Component {
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

    render ( { teams, week } ) {
        return (
            <div className="">
                Live Scoring
            </div>
        );
    }
}
