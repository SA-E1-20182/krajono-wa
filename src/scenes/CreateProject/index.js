import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react'
import { post } from 'axios';

const genreOptions = [  // TODO: there ought to be some collection of these somewhere!
  { key: 'action', text: 'Acción', value: 'Acción' },
  { key: 'sol', text: 'Slice of Life', value: 'Slice of Life' },
  { key: 'historical', text: 'Histórico', value: 'Histórico' },
]

class CreateProject extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            genre: '',
            description: '',
            cover: null
        }

        this.createProject = this.createProject.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        // this.fileUpload = this.fileUpload.bind(this)
    }

    componentWillMount() {
        if(!this.props.userId)  window.location.replace('/login');
    }

    createProject(e) {
        e.preventDefault();
        const { cover } = this.state;

        this.fileUpload(cover)
        .then((response)=>{
            const cover_url = response.data;
            console.log(cover_url);
            const { name, genre, description } = this.state;

            const author_id = "author_id";  // TODO:
            const query =  `mutation CreateProject($input: ProjectInput!) {
                createProject(project: $input) {
                    id
                    name
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
                            name, genre, description, author_id, cover_url
                        }
                    }
                })
            })
        })
        .then(r => {console.log(r); return r.json()})
        .then(data => {
            console.log(data.data);
            const payload = data.data.createProject;

            window.location.replace('/project/' + payload.id);
        })
    }

    fileUpload(file) {
      const formData = new FormData();
      formData.append('file',file)
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      return  post(process.env.REACT_APP_IMAGE_URL, formData,config)
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleDropdownChange(e, { value }) {
        this.setState({ genre: value });
    }

    handleFileChange(event) {
        this.setState({ cover: event.target.files[0] });
    }

    render() {
        const { genre, cover } = this.state;
        return (
            <div className="ui container">
                <div className="ui very padded segment">
                    <h1 className="ui header">Crear proyecto</h1>

                    <form className="ui form" onSubmit={this.createProject}>
                        <div className="fields">
                            <div className="ten wide field">
                                <label>Nombre del proyecto</label>
                                <input type="text" name="name" placeholder="Nombre del proyecto" onChange={this.handleInputChange}/>
                            </div>

                            <div className="six wide field">
                                <label>Género</label>
                                <Dropdown placeholder='Género' value={genre} search selection options={genreOptions} onChange={this.handleDropdownChange}/>
                            </div>
                        </div>

                        <div className="field">
                            <label>Descripción</label>
                            <textarea name="description" placeholder="Descripción" rows="2" onChange={this.handleInputChange}></textarea>
                        </div>

                        <div className="field">
                            <input type="file" onChange={this.handleFileChange} />
                            <img src={cover ? URL.createObjectURL(cover) : ""} alt=""/>
                        </div>

                        <button className="ui button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect((store) => {
    return {
        userId: store.currentUser.token
    };
})(CreateProject);