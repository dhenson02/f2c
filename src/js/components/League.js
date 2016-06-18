'use strict';
import { h, Component } from 'preact';
/** @jsx h */

export default class Home extends Component {
    constructor ( props ) {
        super(props);
        this.state = {};
    }

    componentWillMount () {
        // this.setState({});
    }

    render ( { league } ) {
        return (
            <div className="">
                Home Screen
            </div>
        );
    }
}
