import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import CommentCard from './Comment'

export default class CommentList extends React.Component { 
    render() {
        return (
            // <Comment>
            //     <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            //     <Comment.Content>
            //         <Comment.Author as='a'>Matt</Comment.Author>
            //         <Comment.Metadata>
            //         <span>Today at 5:42PM</span>
            //         </Comment.Metadata>
            //         <Comment.Text>How artistic!</Comment.Text>
            //         <Comment.Actions>
            //         <a>Reply</a>
            //         </Comment.Actions>
            //     </Comment.Content>
            // </Comment>

            <div className="commentList">
                Todos los comentarios:
                <Comment>
                    <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                        <span>Today at 5:42PM</span>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        {/* <Comment.Actions>
                        <a>Reply</a>
                        </Comment.Actions> */}
                    </Comment.Content>
                </Comment>
                {/* <CommentCard author="Kevin Kim">Nice, Comment Box</CommentCard>
                <CommentCard author="Kevin Kim">Sometimes I talk to myself</CommentCard> */}
            </div>
          );
    }
}

