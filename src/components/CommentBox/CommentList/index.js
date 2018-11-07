import React from 'react'
import { Comment } from 'semantic-ui-react'

export default class CommentList extends React.Component {t
    state = {
        comments: []
    }

    // FIXME: do not display all comments, but only comments related to page
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ allComments { id, message } }' }),
        })
        .then(r => r.json())
        .then(data => {
            console.log(data);
            this.setState({ comments: data.data.allComments });
        });
    }

    render() {
        const { comments } = this.state;
        let commentsView = comments.map((comment, index) =>    // TODO: make this a Component
            <Comment key={index}>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>Matt</Comment.Author>
                    <Comment.Metadata>
                    <span>Today at 5:42PM</span>
                    </Comment.Metadata>
                    <Comment.Text>{comment.message}</Comment.Text>
                </Comment.Content>
            </Comment>
        )
        return (
            <div className="commentList">
                Todos los comentarios:
                {commentsView}
            </div>
          );
    }
}

