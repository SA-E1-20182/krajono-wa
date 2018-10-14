import React from 'react';

export default class ActionButtons extends React.Component {
    render() {
        return (
        <div className="ui basic center aligned segment">
            <div class="ui buttons">
                <button class="ui labeled icon button">
                    <i class="left chevron icon"></i>
                    Anterior
                </button>
                <button class="ui button">
                    <i class="plus circle icon"></i>
                    Añadir comentario
                </button>
                <button class="ui right labeled icon button">
                    Siguente
                    <i class="right chevron icon"></i>
                </button>
            </div>            
        </div>
        );
    }
}