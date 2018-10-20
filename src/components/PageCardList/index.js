import React from 'react';
import PageCard from '../PageCard';

export default class PageCardList extends React.Component { 
    render() {
        const { project } = this.props;
        return (
            <div className="ui five cards">
                <PageCard />
                <PageCard />
                <PageCard />
            </div>
        )
    }
}