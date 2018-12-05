import React from 'react';
import { post } from 'axios';
import PageCardList from '../../components/PageCardList';

export default class EditProject extends React.Component {
    constructor() {
        super();

        this.state = {
            project: {},
            newPage: null,
            pageToChange: null,
            pagetoDelete: null
        }

        this.changeProjectCover = this.changeProjectCover.bind(this);
        this.handleNewPageChange = this.handleNewPageChange.bind(this);
        this.handleCoverChange = this.handleCoverChange.bind(this);
        this.uploadImageToVersion = this.uploadImageToVersion.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

    changeProjectCover() {
        const { project, newCover } = this.state;

        this.fileUpload(newCover)
        .then(response => {
            const cover_url = response.data.toString();
            console.log(cover_url);
            const query = `mutation UpdateProject($input: ProjectInput!) {
                updateProject(version: $input) {
                    id
                    name
                    cover_url
                }
            }`;

            fetch(process.env.REACT_APP_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        input: {
                            code: project.id,
                            project: {
                                name: project.name,
                                description: project.description,
                                genre: project.genre,
                                author_id: project.author_id,
                                cover_url
                            }
                        }
                    }
                })
            }).then(r => r.json())
            .then(data => console.log(data));
        })
    }

    handleNewPageChange(event) {
        this.setState({ newPage: event.target.files[0] });
    }

    handleCoverChange(event) {
        this.setState({ newCover: event.target.files[0] });
    }

    uploadImageToVersion() {
        const { id } = this.props.match.params;
        const { newPage } = this.state;

        this.fileUpload(newPage)
        .then((response) => {
            const { data } = response;
            let pages = []; // TODO: obtener arreglo de páginas previo
            pages.push(data.toString());
            return this.createVersion("1", id, pages);            
        })
        .then((data) => {
            console.log("final data", data);
        })
        .catch(error => console.log(error))
    }

    async createVersion(user_id, project_id, pages) {
        console.log(user_id, project_id, pages);
        
        const query =  `mutation CreateVersion($input: VersionInput!) {
            createVersion(version: $input) {
                id
            }
        }`
        
        const r = await fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables: {
                    input: {
                        user_id, project_id, pages
                    }
                }
            })
        });
        return r.json();
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    fileUpload(file){
      const url = 'http://192.168.99.101:3003/image';
      const formData = new FormData();
      formData.append('file',file)
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      return post(url, formData,config)
    }

    render() {
        const { newPage, project } = this.state;

        return (
            <div className="ui container">
                <h1>Editar proyecto</h1>
                <div className="ui container">
                    <PageCardList project={project} />
                </div>
                <div className="ui segment">
                    <h3>Agrega una página a tu proyecto</h3>
                    <form>
                        <input type="file" onChange={this.handleNewPageChange} />
                        <img src={newPage ? URL.createObjectURL(newPage) : ""} alt=""/>
                    </form>
                    <div className="ui violet button" onClick={this.uploadImageToVersion}>Añadir</div>
                </div>
                <div className="ui segment">
                    <h3>Reemplazar una página del proyecto</h3>
                    <form>
                        <h4>Numero de pagina a reemplazar</h4>
                        <input type="text" name="pageToChange" placeholder="Posicion de la pagina" onChange={this.handleInputChange}/>
                        <input type="file" onChange={this.handleFileChange} />
                        <img src={newPage ? URL.createObjectURL(newPage) : ""} alt=""/>
                    </form>
                    <div className="ui violet button" onClick={this.changeImage}>Cambiar</div>
                </div>
                <div className="ui segment">
                    <h3>Elimina una página del proyecto</h3>
                    <form>
                        <input type="text" name="pagetoDelete" placeholder="Posicion de la pagina" onChange={this.handleInputChange}/>
                    </form>
                    <div className="ui violet button" onClick={this.deleteImage}>Eliminar</div>
                </div>

                <div className="ui segment">
                    <h3>Cambiar la portada de tu proyecto</h3>

                    <form>
                        <input type="file" onChange={this.handleCoverChange} />
                        <img src={newCover ? URL.createObjectURL(newCover) : ""} alt=""/>
                    </form>                
                    <div className="ui violet button" onClick={this.changeProjectCover}>Guardar</div>
                </div>
            </div>
        );
    }
}
