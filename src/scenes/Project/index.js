import React from 'react';
import PageCardList from '../../components/PageCardList';

export default class Project extends React.Component {
    constructor() {
        super();

        this.state = {
            project: {},
            cover: null
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
            body: JSON.stringify({ query: `{ projectByCode(code: ${id}) { id, name, cover_url } }` }),
        })
        .then(r => r.json())
        .then(data => {
            const project = data.data.projectByCode;

            this.setState({ project });

            const { cover_url } = project;

            console.log(cover_url)

            fetch(process.env.REACT_APP_IMAGE_URL+'/'+cover_url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(r => console.error(r))
            .then(data => {
              console.log(data)
                this.setState({ cover: data.imageByCode });
            })
            .catch(error => console.error(error))

            /*fetch(process.env.REACT_APP_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: `{ imageByCode(code: ${cover_url}) }` }),
            })
            .then(r => console.error(r))
            .then(data => {
              console.log(data)
                this.setState({ cover: data.imageByCode });
            })
            .catch(error => console.error(error))*/
        });
    }

    render() {
        const { project, cover } = this.state;

        console.log(project);
        console.log(cover);
        return (
            <div className="ui container">
                <div className="ui padded segment">
                    <h1 className="ui header">Proyecto: <i>{project.name}</i>
                        <div className="sub header">creado por <a href="/author/1">José Vitola</a> el 03 de diciembre de 2018</div>
                    </h1>

                <div className="ui violet labeled icon button" onClick={() => window.location.replace('/project/'+project.id+'/edit')}><i className="cog icon"></i> Editar proyecto</div>
                <div className="ui basic red button" onClick={this.deleteProject}>Borrar proyecto</div>

                <img src={cover} alt="Project cover "/>

                </div>

                <PageCardList project={project} />
            </div>
        );
    }
}
