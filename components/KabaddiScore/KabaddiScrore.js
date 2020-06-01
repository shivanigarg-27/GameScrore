

import React, { Component } from "react";
import { Button } from 'reactstrap';
import axios from 'axios';

export default class KabaddiScrore extends Component {

    constructor(props) {
        super(props)
        this.state = { home: null, away: null, delhi: {}, bangal: {}, flag:false};
    }

    componentDidMount() {
        this.setState({ home: null, away: null, delhi: [], bangal: [], flag:false })
    }

    getScore = async () => {
        await axios.get('https://backend.sports.info/api/v1/kabaddi/match/275/info')
        .then(response => {
            const result = response.data.data.items.match_info.result;
            const teams = response.data.data.items.match_info.teams;
            this.setState({ home: result.home, 
                            away: result.away,
                            delhi: {
                                name: teams.home.shortname,
                                logo: teams.home.logo},
                            bangal: {
                                name: teams.away.shortname,
                                logo: teams.away.logo
                            },
                            flag: !this.state.flag 
                        })
        }).catch(err => alert('Error in fetching API...'))
    }


    render() {
        return(
            <>
                <Button color="primary" onClick={() => this.getScore()}>Kabaddi</Button>
                {this.state.flag && 
                    <div className='flex-container'>
                        <div>
                            <h3>Pro  Kabaddi Season 7</h3>

                            <img src={this.state.delhi.logo} alt='Delhi logo' />
                            <span>{this.state.delhi.shortname}</span>
                        </div>
                        <div>
                            <span>
                                FT <br />
                                <strong>{this.state.home} - {this.state.away}</strong>
                            </span>
                        </div>
                        <div>
                            <img src={this.state.bangal.logo} alt='Delhi logo' />
                            <span>{this.state.bangal.shortname}</span>
                        </div>
                    </div>
                }
            <style jsx> 
                {`
                    .flex-container {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }
                `}
            </style>
            </>
        )
    }
}



