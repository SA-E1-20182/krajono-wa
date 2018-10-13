import React from 'react';
import ProjectCardList from '../../components/ProjectCardList';

export default class Home extends React.Component { 
    render() {
        return (
            <div className="ui container" id="home">
                <div className="ui segment">
                    <h1 className="ui header">Bienvenido, user</h1>
                </div>

                <div className="ui segment">
                    <ProjectCardList />    
                </div>
            </div>
        );
    }
}