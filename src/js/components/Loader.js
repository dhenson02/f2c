'use strict';
import { h, Component } from 'preact';
/**@jsx h */

export default class Loader extends Component {
    render ({ visible }) {
        let visibility = visible === true ?
                         'visible' :
                         'hidden';
        let style = { visibility };
        return (
            <div className="loader"
                 style={style}
                 id="loader">
                <div className="loader-a"></div>
                <div className="loader-b"></div>
            </div>
        );
    }
}
