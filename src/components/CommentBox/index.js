import React from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import './styles.css';

export default class CommentBox extends React.Component { 
    render() {
        return (
            
            <div className="ui basic left aligned segment">
                <br/>
                <h1 className="ui centered header">
                    Deja un comentario
                </h1>
                <div class="margin_comment">
                    <CommentForm />
                    <CommentList /> 
                </div>  
            </div>
          );
    }
}
