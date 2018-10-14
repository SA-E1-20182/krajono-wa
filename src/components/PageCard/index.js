import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const PageCard = () => (
  <Card
    href="/project/1/page/1">
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
    <Card.Content>
      <Card.Meta>
        <span className='date'>página 1</span>
      </Card.Meta>
      <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
    </Card.Content>
  </Card>
)

export default PageCard;