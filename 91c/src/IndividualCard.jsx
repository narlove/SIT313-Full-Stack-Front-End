import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { AdvancedImage } from '@cloudinary/react';
import { usePersistence } from './PersistenceContext';

const placeholderSrc = 'https://placehold.co/100?text=No+Image';

function IndividualCard({ title, desc, tags, img, date, id }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const persistence = usePersistence();

	const handleCardClick = () => {
		setIsExpanded(!isExpanded);
	};
	
	const handleDeleteClick = async (e) => {
        e.stopPropagation(); // stop card click when clicking delete button
        
        const confirmed = window.confirm("Are you sure you want to delete this question?");
        
        if (confirmed) {
            try {
                await persistence.deleteData("questions", id);
				window.location.reload();
            } catch (error) {
                console.error("Error deleting question:", error);
                alert("Failed to delete question. Please try again.");
            }
        }
    };

	return (
		<Card
			style={{ width: "400px", cursor: "pointer", position: "relative" }}
			onClick={handleCardClick}
		>
                <div
                    onClick={handleDeleteClick}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "rgba(150, 0, 0, 0.8)",
                        color: "white",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: "18px",
                        fontWeight: "bold"
                    }}
                >
                    −
                </div>
			{img ? (
				<AdvancedImage cldImg={img} style={{ height: "300px", objectFit: "cover" }} />
			) : (
				<Card.Img variant="top" src={placeholderSrc} style={{ height: "300px", objectFit: "cover" }} />
			)}
			<Card.Body>
				<Card.Title><b style={{ fontSize: "20px" }}>{title ?? "Untitled"}</b></Card.Title>
				{isExpanded && (
					<Card.Text>
						{desc ?? "Project description goes here!"}
					</Card.Text>
				)}
			</Card.Body>
			{isExpanded && (
				<Card.Footer>
					<Container>
						<Row>
							<Col>{"tags: " + tags.join(", ")}</Col>
							<Col className="text-end">{"date: " + (date ?? "n/a")}</Col>
						</Row>
					</Container>
				</Card.Footer>
			)}
		</Card>
	);
}

export default IndividualCard;