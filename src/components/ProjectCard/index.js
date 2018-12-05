import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const ProjectCard = (props) => (
  <Card
    href={`/project/${props.project.id}`}>
    <Image src={props.cover} />
    <Card.Content>
      <Card.Header>{props.project.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.project.created_at}</span>
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