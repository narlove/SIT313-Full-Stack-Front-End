import { AdvancedImage } from "@cloudinary/react";
import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, InputGroup, Dropdown, Badge } from "react-bootstrap";
import { usePersistence } from "./PersistenceContext";
import CardCollection from "./CardCollection";

export default function FindQuestion()
{
    const persistence = usePersistence();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchOptions, setSearchOptions] = useState({
        title: true,
        description: true,
        date: false,
        tag: true
    });
    
    const img = persistence.retrieveImage('samples/outdoor-woman');

    // we discuss this in one of the videos somewhere
    // need to use unpacking operator to avoid reassigning the whole state
    const handleSearchOptionToggle = (option) => {
        setSearchOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    // Get selected search options for display
    const selectedOptions = Object.entries(searchOptions)
        .filter(([key, value]) => value)
        .map(([key]) => key);

    // memo allows us to only have to recalculate when any of the dependent values change, see the array at the
    // end of the function
    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) return data;
        
        return data.filter(item => {
            const searchLower = searchTerm.toLowerCase();
            
            return (
                (searchOptions.title && item.title.toLowerCase().includes(searchLower)) ||
                (searchOptions.description && item.description.toLowerCase().includes(searchLower)) ||
                (searchOptions.date && item.date?.toLowerCase().includes(searchLower)) ||
                (searchOptions.tag && item.tags.some(tag => tag.toLowerCase().includes(searchLower)))
            );
        });
    }, [data, searchTerm, searchOptions]);

    // by the nature of firebase, we have to handle async await
    // in react, i have learnt the best way to do this is useeffect
    // see https://stackoverflow.com/questions/57847626/using-async-await-inside-a-react-functional-component
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                const questions = await persistence.getAll('questions');
                setData(questions);
            } catch (err) {
                setError(err.message);
                console.error('Failed to fetch questions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [persistence]); // rerun if persistence changes

    if (loading) {
        return <div>Loading questions...</div>;
    }

    if (error) {
        return <div>Error loading questions: {error}</div>;
    }

    // now, this is only called when data is ready to be passed
    // before, i was getting errors that data wasn't a collection, which stumped me forever
    // but its because it was a resolving promise
    return (
        <Container fluid>
            <Row className="mb-4 mt-3">
                <Col>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search questions..."
                            // basic way to handle inputs in react
                            // i avoided doing it this way for earlier form submissions
                            // but for the search, i believe its the most optimal way to do it as this one actually
                            // should be recalculated every time the search term is set
                            // (also the unit site does it this way)
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-secondary" id="search-options-dropdown">
                                Include in search
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Header>Search Options</Dropdown.Header>
                                <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                                    <Form.Check
                                        type="checkbox"
                                        id="search-title"
                                        label="Title"
                                        checked={searchOptions.title}
                                        onChange={() => handleSearchOptionToggle('title')}
                                    />
                                </Dropdown.Item>
                                <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                                    <Form.Check
                                        type="checkbox"
                                        id="search-description"
                                        label="Description"
                                        checked={searchOptions.description}
                                        onChange={() => handleSearchOptionToggle('description')}
                                    />
                                </Dropdown.Item>
                                <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                                    <Form.Check
                                        type="checkbox"
                                        id="search-date"
                                        label="Date"
                                        checked={searchOptions.date}
                                        onChange={() => handleSearchOptionToggle('date')}
                                    />
                                </Dropdown.Item>
                                <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                                    <Form.Check
                                        type="checkbox"
                                        id="search-tag"
                                        label="Tag"
                                        checked={searchOptions.tag}
                                        onChange={() => handleSearchOptionToggle('tag')}
                                    />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CardCollection collection={filteredData} />
                </Col>
            </Row>
        </Container>
    );
};