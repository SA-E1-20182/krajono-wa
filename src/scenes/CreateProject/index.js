import React from 'react';
import { Dropdown } from 'semantic-ui-react'

const genreOptions = [  // TODO: there ought to be some collection of these somewhere!
  { key: 'action', text: 'Acción', value: 'Acción' },
  { key: 'sol', text: 'Slice of Life', value: 'Slice of Life' },
  { key: 'historical', text: 'Histórico', value: 'Histórico' },
]

export default class CreateProject extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            genre: '',
            description: ''
        }

        this.createProject = this.createProject.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    createProject(e) {
        e.preventDefault();
        const { name, genre, description } = this.state;
        const query =  `mutation CreateProject($input: ProjectInput!) {
            createProject(project: $input) {
                id
                name
            }
        }`

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
                        name, genre, description
                    }
                }
            })
        })
        .then(r => {console.log(r); return r.json()})
        .then(data => {
            console.log(data.data);
            const payload = data.data.createProject;

            window.location.replace('/project/' + payload.id);
        })  
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleDropdownChange(e, { value }) {
        this.setState({ genre: value });
    }

    render() {
        const { genre } = this.state;
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
                        
                        <button className="ui button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}