import React from 'react';

export default class AddVersion extends React.Component {
    constructor() {
        super();

        this.state = {
            user_id: '',
            project_id: '',
            pages: ''
        }

        this.addVersion = this.addVersion.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    addVersion(e) {
        e.preventDefault();
        const { user_id, project_id, pages } = this.state;
        const query =
        `mutation {
            createVersion(version: {
                user_id:` + user_id +`, project_id: ` + project_id +`, pages: ` + JSON.stringify(pages.split(','))+`
            }) {
                id
            }
        }`
        console.log(query);

        fetch("http://192.168.99.101:5000/graphql", {
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
        })
        .then(r => {console.log(r); return r.json()})
        .then(data => {
            console.log(data.data);
            const payload = data.data.addVersion;

            window.location.replace('/version/' + payload.id);
        })  
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    
    render() {
        return (
            <div className="ui container">
                <div className="ui very padded segment">
                    <h1 className="ui header">agregar version</h1>
                    <form className="ui form" onSubmit={this.addVersion}>
                        <div className="fields">
                            <div className="ten wide field">
                                <label>user_id</label>
                                <input type="text" name="user_id" placeholder="user_id" onChange={this.handleInputChange}/>
                            </div>
                            <div className="ten wide field">
                                <label>project_id</label>
                                <input type="text" name="project_id" placeholder="project_id" onChange={this.handleInputChange}/>
                            </div>

                        </div>

                        <div className="field">
                            <label>pages's id separated by commas</label>
                            <textarea name="pages" placeholder="pages" rows="2" onChange={this.handleInputChange}></textarea>
                        </div>
                        
                        <button className="ui button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}