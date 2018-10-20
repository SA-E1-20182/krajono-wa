import React from 'react';

export default class ActionButtons extends React.Component {
    constructor() {
        super();

        this.next = this.next.bind(this);
        this.back = this.back.bind(this);
    }

    back() {
        const { project, currentPage } = this.props;
        const newPage = currentPage <= 1 ? 1 : currentPage - 1;        
        window.location.replace(`/project/${project}/page/${newPage}`);
    }

    next() {
        const { project, currentPage } = this.props;
        const newPage = currentPage + 1;    // TODO: can't be bigger than project's size!   
        window.location.replace(`/project/${project}/page/${newPage}`);
    }

    render() {
        return (
        <div className="ui basic center aligned segment">
            <div className="ui buttons">
                <button className="ui labeled icon button" onClick={this.back}>
                    <i className="left chevron icon"></i>
                    Anterior
                </button>
                <button className="ui button">
                    <i className="plus circle icon"></i>
                    Añadir comentario
                </button>
                <button className="ui right labeled icon button" onClick={this.next}>
                    Siguente
                    <i className="right chevron icon"></i>
                </button>
            </div>
        </div>
        );
    }
}