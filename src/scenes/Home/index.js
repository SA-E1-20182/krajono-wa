import React from 'react';
import ProjectCardList from '../../components/ProjectCardList';

export default class Home extends React.Component {
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
            this.setState({ projects: data.allProjects });
            // console.warn(xhr.responseText) ;
        });
    }

    render() {
        const { projects } = this.state;

        return (
            <div className="ui container" id="home">
                <div className="ui violet padded segment">    
                    <h1 className="ui header">Bienvenido, user</h1>

                    <button className="ui basic violet button" onClick={() => window.location.replace('/project/create')}>
                        <i className="plus circle icon"></i>
                        Crear un proyecto
                    </button>
                </div>

                <div className="ui segment">
                    <ProjectCardList projects={projects} />    
                </div>
            </div>
        );
    }
}
