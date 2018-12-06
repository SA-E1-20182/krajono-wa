import React from 'react';

export default class Signup extends React.Component {
    render() {
        return (
            <div className="ui container">
                <div className="ui center aligned segment">
                    <h1 className="ui header">Registrarse en Krajono</h1>

                    <div className="ui form">
                        <div className="field">
                            <label>Nombre de usuario</label>
                            <input type="text" name="username"/>
                        </div>
                        <div className="field">
                            <label>Correo electrónico</label>
                            <input type="email" name="email"/>
                        </div>
                        <div className="field">
                            <label>Contraseña</label>
                            <input type="password" name="password"/>
                        </div>
                        <div className="field">
                            <label>Repetir contraseña</label>
                            <input type="password" name="password"/>
                        </div>

                        <div className="ui violet button">Registrarse</div>
                    </div>

                    <div className="ui warning message">
                        <p>¿Ya tienes una cuenta en Krajono? <a href="/auth">Inicia sesión</a>.</p>
                    </div>
                </div>
            </div>
        );
    }
}