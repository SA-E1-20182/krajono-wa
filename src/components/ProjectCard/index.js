import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const ProjectCard = (props) => (
  <Card
    href={`/project/${props.project.id}`}>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
    <Card.Content>
      <Card.Header>{props.project.name}</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>{props.project.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div>
        <Icon name='user' />
        {props.project.genre}
      </div>
    </Card.Content>
  </Card>
)

export default ProjectCard;