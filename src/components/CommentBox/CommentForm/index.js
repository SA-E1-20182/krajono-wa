import React from 'react'
import { Button, Form } from 'semantic-ui-react'

export default class CommentForm extends React.Component { 
  render() {
      return (
        <Form reply>
          <Form.TextArea />
          <Button content='Añadir comentario' labelPosition='left' icon='edit' primary />
        </Form>
        );
  }
}