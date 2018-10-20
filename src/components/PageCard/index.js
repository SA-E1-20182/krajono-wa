import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default class PageCard extends React.Component {
  render() {
    const { projectId, page } = this.props;
    return (<Card color={page ? "violet" : "yellow"}
    href={`/project/${projectId}/page/${page}`}>
    <Image src={!page ? 'https://cdn4.iconfinder.com/data/icons/oakcons-3/16/Plus-circle-512.png' : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'} />
    
    {(() => {
      if(page) {
        return (
          <Card.Content>
      
          <Card.Meta>
            <span className='date'>página {page}</span>
          </Card.Meta>
          <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
        </Card.Content>
        );
      } else return (
        <Card.Content>
          <br/>
          <Card.Header>Añadir una nueva página</Card.Header>
        </Card.Content>)
    })()}
  </Card>)
  }
}