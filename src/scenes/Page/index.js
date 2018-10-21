import React from 'react';
import PageContainer from '../../components/PageContainer';
import CommentBox from '../../components/CommentBox';
import ActionButtons from './components/ActionButtons';

export default class Page extends React.Component { 
    render() {
        return (
            <div id="pageView" className="ui container">
                <br/>
                <h1 className="ui centered header">
                    Página 1
                    <div className="sub header">Novela gráfica</div>
                </h1>
                {/* <ActionButtons /> */}
                <PageContainer />
                <ActionButtons />
                <CommentBox />  
            </div>
        )
    }
}