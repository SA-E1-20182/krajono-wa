import React from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

export default class CommentBox extends React.Component { 
    render() {
        return (
            <div className="commentBox">
                <h1>WOO My Comment Box</h1>
                <CommentList />
                <CommentForm />
            </div>
          );
    }
}

// var CommentBox = React.createClass({
//     render: function() {
//       return (
//         <div className="commentBox">
//           We created a React div component! WOO!
//         </div>
//       );
//     }
//   });

//   export default CommentBox

//   ReactDOM.render(
//     <CommentBox />,
//     document.getElementById('content')
//   );
