import React from 'react'
// import { Button, Comment, Form, Header } from 'semantic-ui-react'
import Comment from './Comment'

export default class CommentList extends React.Component { 
    render() {
        return (
            <div className="commentList">
                Yeahhhh I am a CommentList.
                <Comment author="Kevin Kim">Nice, Comment Box</Comment>
                <Comment author="Kevin Kim">Sometimes I talk to myself</Comment>
            </div>
          );
    }
}

