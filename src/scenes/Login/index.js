import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../services/session/actions';

class Login extends React.Component {

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
      const query =  `mutation CreateSession($input: SessionInput!) {
          createSession(auth: $input) {
              jwt
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
                    auth: {
                        email, password
                    }
                }
              }
          })
      })
      .then(r => {console.log(r); return r.json()})
      .then(data => {
          this.props.dispatch(login(data.data.createSession.jwt));
      })
  }

    render() {
        console.log(this.props.userId);
        if(this.props.userId)   window.location.replace("/");

        return (
            <div className="ui container">
                <div className="ui center aligned segment">
                    <h2 className="ui header">Ingresar a Krajono</h2>

                    <div className="ui form">
                        <div className="field">
                            <label>Correo electrónico</label>
                            <input type="email" name="email" onChange={this.handleInputChange}/>
                        </div>

                        <div className="field">
                            <label>Contraseña</label>
                            <input type="password" name="password" onChange={this.handleInputChange}/>
                        </div>

                        <button className="ui violet button" onClick={this.authenticate}>Ingresar</button>
                    </div>

                    <div className="ui warning message">
                        <p>¿No tienes una cuenta aún? <a href="/signup">Regístrate</a>.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((store) => {
    return {
        userId: store.currentUser
    };
})(Login);