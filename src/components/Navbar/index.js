import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class Navbar extends Component {
  constructor() {
    super();

    this.handleItemClick = this.handleItemClick.bind(this);
  }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' onClick={this.handleItemClick} />
          <Menu.Item
            name='messages'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='friends'
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='perfil'
              onClick={() => window.location.replace('/')}
            />
            <Menu.Item
              name='logout'
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}