import React, { Component } from 'react'
import { Button } from 'reactstrap';
import axios from 'axios'

export default class CricketScrore extends Component {
    constructor(props){
        super(props)
        this.state = { home: {}, away: {}, away_score: [], home_score: [], flag: false};
    }

    componentDidMount() {
        this.setState({ home: {}, away: {}, away_score: [], home_score: [], flag: false })
    }

    getScore = async () => {
        await axios.get('https://backend.sports.info/api/v1/cricket/match/sr:match:21246257/timeline')
        .then(response => {

            const teams = response.data.data.sport_event.competitors;
            const event_status = response.data.data.sport_event_status.period_scores;
            
            const home = (teams.map(team => team.qualifier == 'home' && team)).filter(Boolean)
            const away = (teams.map(team => team.qualifier == 'away' && team)).filter(Boolean)
            
            let away_score = [] 
            let home_score = []
            away_score.push(event_status.map(event => event.away_score !== undefined && event.away_score))
            home_score.push(event_status.map(event => event.home_score !== undefined && event.home_score))
            

            this.setState({ home: { name: home[0].abbreviation },
                            away: { name: away[0].abbreviation },
                            away_score: away_score[0].filter(Boolean),
                            home_score: home_score[0].filter(Boolean),
                            flag: !this.state.flag
                        })
        }).catch(err => alert('Error in fetching API...'))
    }

    render() {
        return(
            <>
                <Button color="primary" onClick={() => this.getScore()}>Cricket</Button>
                {this.state.flag && 
                    <div>
                        Test Series New Zealand vs India 2020
                        <h2>NEW ZEALAND VS INDIA </h2>

                        <div>
                            { this.state.away.name }
                            { this.state.away_score.join(' & ') }

                        </div>
                        <div>
                            { this.state.home.name }
                            { this.state.home_score.join(' & ') }
                        </div>
                    </div>
                }
            </>
        )
    }
}