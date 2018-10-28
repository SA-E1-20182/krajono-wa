import React from 'react';
import PageCardList from '../../components/PageCardList';
import { Dropdown } from 'semantic-ui-react';

export default class Version extends React.Component {
    constructor() {
        super();

        this.state = {
            version: {},
        }

        this.deleteVersion = this.deleteVersion.bind(this);

        this.tagOptions = [
            {
              text: 'Borrar proyecto',
              value: 'Delete',
              label: { color: 'red', empty: true, circular: true },
              onClick: this.deleteVersion
            },
        ]
    }

    deleteVersion() {
        const { id } = this.props.match.params;
        const query =  `mutation DeleteVersion($input: Int!) { deleteVersion(code: $input) }`

        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                query,
                variables: {
                    input: id
                }
            })
        })
        .then(r => {console.log(r); return r.json()})
        .then(data => {
            window.location.replace('/');
        })  
    }

    componentWillMount() {
        const { id } = this.props.match.params;

        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: `{ versionByCode(code: ${id}) { id, name } }` }),
        })
        .then(r => r.json())
        .then(data => {
            this.setState({ version: data.data.versionByCode });
        });
    }
    
    render() {
        const { version } = this.state;

        return (
            <div className="ui container">
                <div style={{float: 'right'}}>
                    <Dropdown text='Configuración' icon='cog' floating labeled button className='violet icon'>
                        <Dropdown.Menu>
                            <Dropdown.Menu scrolling>
                                {this.tagOptions.map(option => <Dropdown.Item key={option.value} {...option} />)}
                            </Dropdown.Menu>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
                <h1 className="ui header">Proyecto: <i>{version.name}</i>
                    <div className="sub header">creado el 03 de diciembre de 2018</div>
                </h1>
                <PageCardList version={version} />
            </div>
        );
    }
}