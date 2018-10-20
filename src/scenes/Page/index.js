import React from 'react';
import PageContainer from '../../components/PageContainer';
import ActionButtons from './components/ActionButtons';

export default class Page extends React.Component {
    state = {
        loading: true,
        project: {}
    }

    componentWillMount() {
        const { id, num } = this.props.match.params;

        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: `{ projectByCode(code: ${id}) { name } }` }),
        })
        .then(r => r.json())
        .then(data => {
            if(!data.data)
                window.location.replace('/404');
            else {
                const project = data.data.projectByCode;
                document.title = `Página ${num} - ${project.name} - Krajono`
                this.setState({ loading: false, project });
            }
        });
    }

    render() {
        
        const {id, num} = this.props.match.params;
        const {loading, project} = this.state;
        const currentPage = parseInt(num);
        
        return (
            <div id="pageView" className="ui container">
                <br/>
                <h1 className="ui centered header">
                    Página {num}
                    <div className="sub header">volver a <a href={`/project/${id}`}>{project.name}</a></div>
                </h1>

                <ActionButtons project={id} currentPage={currentPage} />
                {loading ? "" : <PageContainer />}
                <ActionButtons project={id} currentPage={currentPage} />
            </div>
        )
    }
}