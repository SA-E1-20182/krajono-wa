import React from 'react'
import { Button, Form } from 'semantic-ui-react'

export default class CommentForm extends React.Component {
  state = {
    message: ''
  }

  onSubmit(e) {
    e.preventDefault();
    const { message } = this.state;
    const { versionId, imageId } = this.props;

    console.log(message, versionId, imageId);
    const query =  `mutation CreateComment($input: CommentInput!) {
        createComment(comment: $input) {
            id
            message
        }
    }`

    fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
      },
      body: JSON.stringify({ 
          query,
          variables: {
              input: {
                  message,
                  version_id: versionId,
                  image_id: imageId,
                  likes: 0  // FIXME: culpa del backend
              }
          }
      })
    })
  }

  render() {
    const { message } = this.state;
    return (
      <Form reply onSubmit={(e) => this.onSubmit(e)}>
        <Form.TextArea value={message} onChange={(e) => this.setState({ message: e.target.value })}/>
        <Button content='Añadir comentario' labelPosition='left' icon='edit' primary />
      </Form>
      );
  }
}