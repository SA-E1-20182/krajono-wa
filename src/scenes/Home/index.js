import React from 'react';
import { connect } from 'react-redux';

import ProjectCardList from '../../components/ProjectCardList';

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            projects: [],
        }
    }

    componentWillMount() {
        if(!this.props.token)
            window.location.replace("/login");
    }

    componentDidMount() {   
        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ allProjects { id, name, genre, description, cover_url, created_at } }' }),
        })
        .then(r => r.json())
        .then(data => {
            let projects = data.data.allProjects;
            this.setState({ projects });
            
            let codes = [];
            projects.forEach(project => {
                codes.push(isNaN(parseInt(project.cover_url)) ? 1 : 8);
            });

            const query =  `mutation CollectionOfImages($input: [Int!]) {
                collectionOfImages(codes: $input)
            }`;

            fetch(process.env.REACT_APP_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        input: codes                        
                    }
                })
            }).then(r => r.json())
            .then(data => {
                this.setState({covers: data.data.collectionOfImages})
            }).catch(error => console.error(error));
        });
    }

    render() {
        const { projects, covers } = this.state;
        const { username } = this.props;

        return (
            <div className="ui container" id="home">
                <div className="ui violet padded segment">    
                    <h1 className="ui header">Bienvenido, {username}</h1>

                    <button className="ui basic violet button" onClick={() => window.location.replace('/project/create')}>
                        <i className="plus circle icon"></i>
                        Crear un proyecto
                    </button>
                </div>

                <div className="ui segment">
                    {projects && covers ? <ProjectCardList projects={projects} covers={covers} /> : ''}
                </div>
            </div>
        );
    }
}

export default connect((store) => {
    return {
        token: store.currentUser.token,
        username: store.currentUser.username
    };
})(Home);