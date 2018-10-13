import React from 'react';
import PageCard from '../PageCard';

export default class ProjectCardList extends React.Component { 
    render() {
        return (<div className="ui five cards">
            <PageCard />
            <PageCard />
            <PageCard />
        </div>)
    }
}