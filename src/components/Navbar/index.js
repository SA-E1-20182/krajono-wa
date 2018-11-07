import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <Menu size="huge" pointing secondary>
          <Menu.Item name='krajono' onClick={() => window.location.replace('/')} />
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
              onClick={() => window.location.replace('/author/1')}
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