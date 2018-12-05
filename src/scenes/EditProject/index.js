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

        this.handleFileChange = this.handleFileChange.bind(this);
        this.uploadImageToVersion = this.uploadImageToVersion.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleFileChange(event) {
        this.setState({ newPage: event.target.files[0] });
    }

    uploadImageToVersion() {
        const { id } = this.props.match.params;
        const { newPage } = this.state;

        this.fileUpload(newPage)
        .then((response) => {
            const { data } = response;
            console.log(id);
            return this.createVersion("1", id, [data.id])
        })
        .then((data) => {
            console.log("final data", data);
        })
        .catch(error => console.log(error))
    }

    createVersion(user_id, project_id, pages) {
        const query =  `mutation CreateVersion($input: VersionInput!) {
            createVersion(version: $input) {
                id
            }
        }`

        return fetch(process.env.REACT_APP_API_URL, {
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
        }).then(r => r.json())
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
                        <input type="file" onChange={this.handleFileChange} />
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
            </div>
        );
    }
}
