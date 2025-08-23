import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import IndividualCard from './IndividualCard';
import { usePersistence } from './PersistenceContext';

function CardCollection({ collection }) {
    const persistence = usePersistence();

    if (!collection) {
        return (
            <Row xs={1} md={3} style={{ margin: "0px" }} className="py-2">
            </Row>
        )
    }

    const collectionWithImages = collection.map(ele => ({
        ...ele,
        img: ele.thumbnailRef ? persistence.retrieveImage(ele.thumbnailRef) : null
    }));

    return (
        <Row xs={1} md={4} style={{ margin: "10px" }} className="py-2">
            {collectionWithImages.map((obj, i) => {
                return <Col key={i} className="d-flex justify-content-center">
                    <IndividualCard
                        title={obj.title}
                        desc={obj.description}
                        tags={obj.tags}
                        img={obj.img}
                        date={obj.date ?? null}
                        id={obj.id}
                    />
                </Col>
            })}
        </Row>
    );
}

export default CardCollection;