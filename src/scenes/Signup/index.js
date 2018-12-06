import React from 'react';
import { connect } from 'react-redux';

import './styles.css';

class Signup extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            email: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.signup = this.signup.bind(this);
    }

    componentDidMount() {
        if(this.props.userId)
            window.location.replace("/");
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    signup() {
        console.log("signup");
    }

    render() {
        console.log(this.state);

        return (
            <div className="ui container">
                <div id="signupSegment" className="ui center aligned very padded segment">
                    <h1 className="ui header">Registrarse en Krajono</h1>

                    <div className="ui form">
                        <div className="field">
                            <label>Nombre de usuario</label>
                            <input type="text" name="username" onChange={this.handleInputChange}/>
                        </div>
                        <div className="field">
                            <label>Correo electrónico</label>
                            <input type="email" name="email" onChange={this.handleInputChange}/>
                        </div>
                        <div className="field">
                            <label>Contraseña</label>
                            <input type="password" name="password" onChange={this.handleInputChange}/>
                        </div>
                        <div className="field">
                            <label>Repetir contraseña</label>
                            <input type="password" name="password" onChange={this.handleInputChange}/>
                        </div>

                        <div className="ui violet button" onClick={this.signup}>Registrarse</div>
                    </div>  

                    <div className="ui divider"></div>

                    <div className="ui warning message">
                        <p>¿Ya tienes una cuenta en Krajono? <a href="/login">Inicia sesión</a>.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((store) => {
    return {
        userId: store.currentUser.id,
    };
})(Signup);