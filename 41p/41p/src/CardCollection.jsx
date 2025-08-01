import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import IndividualCard from './IndividualCard';

const src = 'https://picsum.photos/seed/voila/400';

function mapObjectToCard(obj, i) {
    return (
        <Col key={i} className="d-flex justify-content-center">
            <IndividualCard
                title={obj.title}
                desc={obj.desc}
                starRating={obj.starRating}
                author={obj.author}
                imageSource={obj.imageSource}
            />
        </Col>
    );
}

function CardCollection(props) {
    if (!props.collection) {
        return (
            <Row xs={1} md={3} style={{margin: "0px"}} className="py-2">
            </Row>
        )
    }

    // otherwise

    return (
        <Row xs={1} md={3} style={{margin: "0px"}} className="py-2">
            {props.collection.map(mapObjectToCard)}
        </Row>
    );
}

export default CardCollection;