import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody } from 'reactstrap';

const Example = (props) => {
  return (
    <CardDeck>
      <Card>
        <CardImg top width="100%" src={require("assets/img/hero-image-1.png")} alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Button</Button>
        </CardBody>
        <CardImg top width="100%" src={require("assets/img/hero-image-1.png")} alt="Card image cap" />
      </Card>
      <Card>
        <CardImg top width="100%" src={require("assets/img/hero-image-1.png")} alt="Card image cap" />
        <div className="card-img-overlay">
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
          <Button
                className="btn-round"
                color="info"
                href="https://nucleoapp.com/?ref=1712"
                outline
                size="lg"
                target="_blank"
              >
                Read More
              </Button>
        </CardBody>
        </div>
      </Card>
    </CardDeck>
  );
};

export default Example;