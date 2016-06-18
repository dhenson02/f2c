'use strict';
import { h, Component } from 'preact';
import { franchise, league } from '../data';
/**@jsx h */

export default class TeamSelector extends Component {
    constructor ( props ) {
        super(props);
        this.state = {
            teamList: null
        };
        league.on('change', store => {
            var state = store.getState();
            const teamList = state.size !== 0 ?
                state.get('franchises')
                    .franchise
                    .map(( team, i ) => {
                        return (
                            <option key={i}
                                    value={team.id}>
                                {team.name}
                            </option>
                        );
                    }) :
                             null;
            this.setState({
                teamList
            });
        });

    }

    /*

     shouldComponentUpdate ( nextProps ) {
     return nextProps.loading !== this.props.loading;
     }
     */

    handleID ( e ) {
        let id = e.target.value;
        this.props.router.setRoute(`/franchise/${id}`);
    }

    render ( props, { teamList }) {
        return (
            <div className="form-group container">
                <div className="input-group">
                    <select className="form-control"
                            disabled={teamList === null}
                            onChange={e => this.handleID(e)}
                            id="id-input">
                        {teamList}
                    </select>
                </div>
            </div>
        );
    }
}
