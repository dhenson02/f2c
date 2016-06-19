'use strict';
import { h, Component } from 'preact';
import { franchise, league } from '../data';
import Loader from './Loader';
/**@jsx h */

export default class TeamSelector extends Component {
    constructor ( props ) {
        super(props);
        this.state = {
            'selected': props.current || null,
            'loaded': false,
            'teamList': null
        };
        league.on('change', store => {
            if ( store.getState().size > 0 ) {
                this.setState({
                    'loaded': true
                });
            }
        });

    }

    getTeamList ( state, selected ) {
        const placeHolder = [
            <option key={35}>Choose your Franchise</option>
        ];
        const teamList = state.get('franchises')
            .franchise
            .map(( team, i ) => {
                return (
                    <option key={i}
                            selected={team.id === selected}
                            value={team.id}>
                        {team.name}
                    </option>
                );
            });
        return placeHolder.concat(teamList);
    }

    /*

     shouldComponentUpdate ( nextProps ) {
     return nextProps.loading !== this.props.loading;
     }
     */

    handleID ( e ) {
        let id = e.target.value;
        this.setState({
            selected: id
        });
        this.props.router.setRoute(`/franchise/${id}`);
    }

    render ( { current }, { selected, loaded }) {
        if ( loaded === false ) {
            return <Loader visible={true}/>;
        }
        var state = league.getState();
        const teamList = state.size > 0 ?
                         this.getTeamList(state, selected || current) :
                         null;
        return (
            <div className="form-group container">
                <div className="input-group">
                    <select className="form-control"
                            onChange={e => this.handleID(e)}
                            id="id-input">
                        {teamList}
                    </select>
                </div>
            </div>
        );
    }
}
