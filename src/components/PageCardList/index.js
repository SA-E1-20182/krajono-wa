import React from 'react';
import PageCard from '../PageCard';

export default class PageCardList extends React.Component { 
    render() {
        const { id } = this.props.project;
        return (
            <div className="ui five cards">
                <PageCard projectId={id} page={1} />
                <PageCard projectId={id} page={2} />
                <PageCard projectId={id} page={3} />
                <PageCard projectId={id} />
            </div>
        )
    }
}