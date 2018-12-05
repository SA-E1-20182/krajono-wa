import React from 'react';
import ProjectCard from '../ProjectCard';

export default class ProjectCardList extends React.Component { 
    render() {
        const { projects, covers } = this.props;
        console.log(covers);
        return (<div className="ui three cards">
            {(() => {
                const cards = projects.map((project, index) => <ProjectCard key={index} project={project} cover={covers[index]}/>);
                return cards;
            })()}
        </div>)
    }
}