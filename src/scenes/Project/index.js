import React from 'react';
import PageCardList from '../../components/PageCardList';

export default class Project extends React.Component { 
    render() {
        return (
            <div className="ui container">
                <h1 className="ui header">Proyecto: Novela gráfica
                    <div className="sub header">creado el 03 de diciembre de 2018</div>
                </h1>
                <PageCardList />
            </div>
        )
    }
}