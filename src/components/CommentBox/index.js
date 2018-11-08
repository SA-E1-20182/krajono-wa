import React from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import './styles.css';

export default class CommentBox extends React.Component { 
    render() {
        const { versionId, imageId } = this.props;
        return (
            
            <div className="ui basic left aligned segment">
                <br/>
                <h1 className="ui centered header">
                    Deja un comentario
                </h1>
                <div className="margin_comment">
                    <CommentForm versionId={versionId} imageId={imageId} />
                    <CommentList /> 
                </div>  
            </div>
          );
    }
}
