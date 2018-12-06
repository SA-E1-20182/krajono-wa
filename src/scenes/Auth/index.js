import React from 'react';

export default class Auth extends React.Component {

  constructor() {
      super();

      this.state = {
          email: '',
          password: ''
      }

      this.handleInputChange = this.handleInputChange.bind(this);
      this.authenticate = this.authenticate.bind(this)
  }

  handleInputChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  authenticate(){
      const { email, password } = this.state;
      const query =  `mutation Auth($input: AuthInput!) {
          auth(auth: $input) {
              answer
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
                input:{
                  email, password
                }
              }
          })
      })
      .then(r => {console.log(r); return r.json()})
      .then(data => {
          console.log(data.data);
      })
  }

    render() {
        return (
            <div className="ui container">
                <div className="ui center aligned segment">
                    <h2 className="ui header">Ingresar a Krajono</h2>

                    <div className="ui form">
                        <div className="field">
                            <label>Nombre de usuario</label>
                            <input type="text" name="email" onChange={this.handleInputChange}/>
                        </div>

                        <div className="field">
                            <label>Contraseña</label>
                            <input type="password" name="password" onChange={this.handleInputChange}/>
                        </div>

                        <button className="ui violet button" onClick={this.authenticate}>Ingresar</button>
                    </div>
                </div>
            </div>
        );
    }
}
