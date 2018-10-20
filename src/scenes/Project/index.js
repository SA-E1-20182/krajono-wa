import React from 'react';
import PageCardList from '../../components/PageCardList';

export default class Project extends React.Component {
    constructor() {
        super();

        this.state = {
            project: {},
        }
    }

    componentWillMount() {
        const { id } = this.props.match.params;

        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: `{ projectByCode(code: ${id}) { name } }` }),
        })
        .then(r => r.json())
        .then(data => {
            this.setState({ project: data.data.projectByCode });
        });
    }
    
    render() {
        const { project } = this.state;

        return (
            <div className="ui container">
                <h1 className="ui header">Proyecto: <i>{project.name}</i>
                    <div className="sub header">creado el 03 de diciembre de 2018</div>
                </h1>
                <PageCardList project={project} />
            </div>
        )
    }
}