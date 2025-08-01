import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

const src = 'https://picsum.photos/seed/voila/600';

function IndividualCard(props) {
	return (
		<Card style={{ width: "400px" }}>
			<Card.Img variant="top" src={props.imageSource ?? src} />
			<Card.Body>
				<Card.Title><b style={{fontSize: "20px"}}>{props.title ?? "Untitled"}</b></Card.Title>
				<Card.Text>
					{props.desc ?? "Project description goes here!"}
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Container>
					<Row>
						<Col>{"⭐ " + (props.starRating ?? "unrated")}</Col>
						<Col className="text-end">{props.author ?? "anonymous"}</Col>
					</Row>
				</Container>
			</Card.Footer>
		</Card>
	);
}

export default IndividualCard;