'use strict';

import { h, Component } from 'preact';
// import ReactPivot from 'react-pivot/load';
import { franchise, league } from '../data';
/**@jsx h */

export default class Franchise extends Component {
    constructor ( props ) {
        super(props);
        this.state = {
            'franchise': null,
            'id': ''
        };
        league.on('change', data => {
            this.setFranchise(props.id, data.getState('franchises'))
        });
    }

    componentWillMount () {
        const francs = league.getState('franchises');
        if ( francs ) {
            this.setFranchise(this.props.id, francs);
        }
        else {
            league.grabData('load league settings');
        }
    }

    componentWillReceiveProps ( nextProps ) {
        this.setFranchise(nextProps.id);
    }

    setFranchise ( id, data ) {
        data = data || league.getState('franchises');
        const current = franchise.setData(data.franchise).getState(id);
        this.setState({
            'franchise': current,
            'id': id || ''
        });
    }

    render ( { id }, state ) {
        console.log(franchise.getState(), state);
        /*if ( !state.franchise && id ) {
            this.setFranchise(id);
            return null;
        }*/
        return (
            <div>
                <Team team={state.franchise} />
            </div>
        );
    }
}

class Team extends Component {
    constructor ( props ) {
        super(props);
    }

    /*componentWillMount () {
     let icon = this.props.franchise.get('icon') ?
     true :
     false;
     this.setState({
     icon
     });
     }*/

    /*    componentWillReceiveProps ( nextProps ) {
     }*/

   /* shouldComponentUpdate ( nextProps ) {
        return nextProps.team !== this.props.team;
    }*/

    handleIconError () {
        /*this.setState({
         icon: false
         });*/
    }

    render () {
        let team = this.props.team;
        if ( !team || team.size === 0 ) {
            return null;
        }
        /*let icon = this.props.team.get('icon') ?
         true :
         false;
         this.setState({
         icon
         });*/
        /*let iconClass = this.state.icon ?
         "img-circle" :
         "img-circle icon-missing";*/
        let iconClass = "img-circle";
        return (
            <div className="jumbotron">
                <h2>
                    <span className={iconClass}>
                        <img className="img-circle"
                             width="48"
                             height="48"
                             onError={() => this.handleIconError()}
                             src={team.get('icon')}/>
                    </span> {team.get('name')}
                </h2>
                <TeamStats team={team}/>
            </div>
        );
    }
}

class TeamStats extends Component {
    constructor ( props ) {
        // console.log(props.team.toJS());
        super(props);
    }

    /*shouldComponentUpdate ( nextProps ) {
        return nextProps.team !== this.props.team;
    }*/

    static parseStats ( stats ) {

        let ties = stats.h2ht !== '0' ?
                   <li>Ties: {stats.h2ht}</li> :
                   null;
        let pf = parseInt(stats.pf, 10);
        let pa = parseInt(stats.pa, 10);
        let ratio = Math.round(100 * (pa / pf));
        let ratioClass = ratio < 81 ?
                         'success' :
                         ( ratio < 90 ? 'warning' : 'danger' );
        return {
            ties,
            pf,
            pa,
            ratio,
            ratioClass
        };
    }

    render () {
        let stats = this.props.team.get('stats');
        if ( !stats || stats.size === 0 ) {
            return null;
        }
        const {
            ties,
            pf,
            pa,
            ratio,
            ratioClass
        } = this.parseStats(stats);
        return (
            <ul>
                <li>Wins: {stats.h2hw}</li>
                <li>Losses: {stats.h2hl}</li>
                {ties}
                <li>Points scored: {pf}</li>
                <li>Points against: {pa}</li>
                <li className={`label label-${ratioClass}`}>
                    Reverse Ratio: {ratio}%
                </li>
            </ul>
        );
    }
}


/*

 <ReactPivot rows={}/>

export class TableHead extends Component {
    constructor ( props ) {
        super(props);
    }

    /!*shouldComponentUpdate ( nextProps ) {
        return nextProps.sorting !== this.props.sorting;
    }*!/

    render () {
        let nameClass = this.props.sorting === 'name' ? 'active' : '';
        let positionClass = this.props.sorting === 'position' ? 'active' : '';
        let teamClass = this.props.sorting === 'team' ? 'active' : '';
        let scoreClass = this.props.sorting === 'score' ? 'active' : '';

        let scoreColumn = (
            <th onClick={e => this.props.scoreSort()}
                className={scoreClass}>
                Score
            </th>
        );

        return (
            <tr>
                {scoreColumn}
                <th onClick={e => this.props.nameSort()}
                    className={nameClass}>
                    Name
                </th>
                <th>
                    Injury
                </th>
                <th onClick={e => this.props.positionSort()}
                    className={positionClass}>
                    Position
                </th>
                <th onClick={e => this.props.teamSort()}
                    className={teamClass}>
                    Team
                </th>
            </tr>
        );
    }
}
*/
