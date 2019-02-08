import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../services/session/actions';

class Login extends React.Component {

  constructor() {
      super();

      this.state = {
          email: '',
          password: '',
          error: false
      }

      this.handleInputChange = this.handleInputChange.bind(this);
      this.authenticate = this.authenticate.bind(this)
  }

  componentWillMount() {
    if(this.props.userId)   window.location.replace("/");
  }

  handleInputChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

    authenticate(){
        const { email, password } = this.state;
        const authQuery = `mutation Auth($input: AuthInput!) {
            auth(auth: $input) {
                answer
            }
        }`

        const query =  `mutation CreateSession($input: SessionInput!) {
            createSession(auth: $input) {
                jwt
            }
        }`
        let token = '';

        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: authQuery,
                variables: {
                    input: {
                        email, password
                    }
                }
            })
        }).then(r => r.json())
        .then(data => {
            console.log(data);
            if(data.data && data.data.auth.answer === "2") {
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
                .then(data2 => {
                    if(!data2.data) {
                        console.error(data2);
                        this.setState({ error: true });
                    } else {
                        const user = data2.data.createSession;
                        token = user.jwt;
                        console.log(token);
    
                        fetch(process.env.REACT_APP_API_URL, {
                            method: 'POST',
                            headers: {
                                'Authorization': token,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ query: `{ checkSession(token: { token: "${token}") } { id, username } }`}),
                        }).then(data => {
                            console.log(data);
                            const username = data.msg;
                            
                            this.props.dispatch(login({ 
                                username, token
                            }));
    
                            window.location.replace('/');
                        }).catch(error => console.error(error));
                    }
                })
            } else {
                this.setState({ error: true })
            }
        });
    }

    render() {
        const { error } = this.state;

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

                    { error ? 
                    <div className="ui error message">
                        <p>Ups! Ocurrió un error. Inténtalo de nuevo.</p>
                    </div>
                    :
                    <div className="ui warning message">
                        <p>¿No tienes una cuenta aún? <a href="/signup">Regístrate</a>.</p>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default connect((store) => {
    return {
        userId: store.currentUser.token
    };
})(Login);