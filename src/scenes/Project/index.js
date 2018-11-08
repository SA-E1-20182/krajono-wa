import React from 'react';
import PageCardList from '../../components/PageCardList';

export default class Project extends React.Component {
    constructor() {
        super();

        this.state = {
            project: {},
        }

        this.deleteProject = this.deleteProject.bind(this);

        this.tagOptions = [
            {
              text: 'Borrar proyecto',
              value: 'Delete',
              label: { color: 'red', empty: true, circular: true },
              onClick: this.deleteProject
            },
        ]
    }

    deleteProject() {
        const { id } = this.props.match.params;
        const query =  `mutation DeleteProject($input: Int!) { deleteProject(code: $input) }`

        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                query,
                variables: {
                    input: id
                }
            })
        })
        .then(r => {console.log(r); return r.json()})
        .then(data => {
            window.location.replace('/');
        })  
    }

    componentWillMount() {
        const { id } = this.props.match.params;

        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: `{ projectByCode(code: ${id}) { id, name } }` }),
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
                <div className="ui padded segment">
                    <h1 className="ui header">Proyecto: <i>{project.name}</i>
                        <div className="sub header">creado por <a href="/author/1">José Vitola</a> el 03 de diciembre de 2018</div>
                    </h1>

                <div className="ui violet labeled icon button" onClick={() => window.location.replace('/project/'+project.id+'/edit')}><i className="cog icon"></i> Editar proyecto</div>
                <div className="ui basic red button" onClick={this.deleteProject}>Borrar proyecto</div>

                </div>
                
                <PageCardList project={project} />
            </div>
        );
    }
}