import React from 'react';
import { post } from 'axios';

export default class EditProject extends React.Component {
    constructor() {
        super();

        this.state = {
            project: null,
            newPage: null
        }

        this.handleFileChange = this.handleFileChange.bind(this);
        this.uploadImageToVersion = this.uploadImageToVersion.bind(this);
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
        const { newPage } = this.state;
        return (
            <div className="ui container">
                <h1>Editar proyecto</h1>

                <div className="ui segment">
                    <h3>Agrega una página a tu proyecto</h3>
                    <form>
                        <input type="file" onChange={this.handleFileChange} />
                        <img src={newPage ? URL.createObjectURL(newPage) : ""} alt=""/>
                    </form>                
                    <div className="ui violet button" onClick={this.uploadImageToVersion}>Guardar</div>
                </div>
            </div>
        ); 
    }
}