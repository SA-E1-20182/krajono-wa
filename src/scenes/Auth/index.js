import React from 'react';

export default class Auth extends React.Component {
    render() {
        return (
            <div className="ui container">
                <div className="ui center aligned segment">
                    <h2 className="ui header">Ingresar a Krajono</h2>

                    <div className="ui form">
                        <div className="field">
                            <label>Nombre de usuario</label>
                            <input type="text" name="username"/>
                        </div>

                        <div className="field">
                            <label>Contraseña</label>
                            <input type="password" name="password"/>
                        </div>

                        <div className="ui violet button">Ingresar</div>
                    </div>
                </div>
            </div>
        ); 
    }
}