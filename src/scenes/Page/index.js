import React from 'react';
import PageContainer from '../../components/PageContainer';
import ActionButtons from './components/ActionButtons';

export default class Page extends React.Component {
    render() {
        const {id, num} = this.props.match.params;
        const currentPage = parseInt(num);
        
        return (
            <div id="pageView" className="ui container">
                <br/>
                <h1 className="ui centered header">
                    Página {num}
                    <div className="sub header">volver a <a href={`/project/${id}`}>Novela gráfica</a></div>
                </h1>

                <ActionButtons project={id} currentPage={currentPage} />
                <PageContainer />
                <ActionButtons project={id} currentPage={currentPage} />
            </div>
        )
    }
}