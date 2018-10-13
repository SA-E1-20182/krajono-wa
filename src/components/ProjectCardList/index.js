import React from 'react';
import ProjectCard from '../ProjectCard';

export default class ProjectCardList extends React.Component { 
    render() {
        return (<div className="ui three cards">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </div>)
    }
}