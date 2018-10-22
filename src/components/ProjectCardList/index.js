import React from 'react';
import ProjectCard from '../ProjectCard';

export default class ProjectCardList extends React.Component { 
    render() {
        const { projects } = this.props;
        console.log(projects);
        return (<div className="ui three cards">
            {(() => {
                const cards = projects.map((project, index) => <ProjectCard key={index} project={project} />);
                return cards;
            })()}
        </div>)
    }
}