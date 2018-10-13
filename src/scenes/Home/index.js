import React from 'react';
import { Segment } from 'semantic-ui-react'

export default class Home extends React.Component { 
    render() {
        return (
            <div id="home">
                <Segment>
                <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                </Segment>
            </div>
        );
    }
}