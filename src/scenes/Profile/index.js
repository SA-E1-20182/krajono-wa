import React from 'react';

import ProjectCardList from '../../components/ProjectCardList';

export default class Profile extends React.Component {
    constructor() {
        super();

        this.state = {
            projects: [],
        }
    }

    componentWillMount() {
        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ allProjects { id, name, genre, description } }' }),
        })
        .then(r => r.json())
        .then(data => {
            this.setState({ projects: data.data.allProjects });
        });
    }

    render() {
        return (
            <div id="profilePage" className="ui container">
                <img className="ui small centered circular image" src='https://react.semantic-ui.com/images/avatar/large/matthew.png' alt="Profile pic for user"/>
                <h1 class="ui centered header">
                    José David Nieto Vitola
                    <div className="sub header">autor en Krajono desde diciembre del 2018</div>
                </h1>

                <h3 className="ui centered header">es creador de:</h3>

                <ProjectCardList projects={this.state.projects}/>
            </div>
        );
    }
}