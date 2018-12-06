import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { logout } from '../../services/session/actions';

class Navbar extends Component {
  render() {
    const { userId } = this.props;

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
            { userId ? 
                <Menu.Item
                  name='Perfil'
                  onClick={() => window.location.replace('/author/1')}
                />
              :
                <Menu.Item
                  name='Registrarse'
                  onClick={() => window.location.replace('/signup')}
                />
            }
            
            { userId ? 
                <Menu.Item
                  name='Logout'
                  onClick={() => { this.props.dispatch(logout()); window.location.replace('/'); }}
                />
              :
                <Menu.Item
                  name='Ingresar'
                  onClick={() => window.location.replace('/login')}
                />
            }
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default connect((store) => {
  return {
      userId: store.currentUser.token,
      loggedIn: store.loggedIn
  };
})(Navbar);