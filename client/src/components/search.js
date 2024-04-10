import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import SearchCard from './searchCard.component';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom'

axios.defaults.baseURL = 'http://localhost:3000';
const token = localStorage.getItem('token');

function Search() {
    const [searchText, setSearchText] = useState('');
    const [searchRes, setSearchRes] = useState([]);
    let [searchWasSuccess, setSearchWasSuccess] = useState(false);
    const [respIsLoading, setRespIsLoading] = useState(false);

    const navigate = useNavigate();

    const genThread = async () => {
        const data = {
            search_text: searchText
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        setRespIsLoading(true);

        const response = await axios.post('/api/v0/work/generateThread', data, config);
        console.log("response haha: "+response.data);
        setRespIsLoading(false);
        navigate("/thread/" + response.data.thread._id);
    };

    const loadingSpinner = (
        <div>
        <br />
        <Row className="justify-center-content">
        <Col className="text-center">
        <Spinner animation="border" role="status" sz="sm"></Spinner>
        </Col>
        </Row>
        </div>
    );

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            execSearch();
        }
    };

    const execSearch = async () => {
        try {
            console.log("search for", searchText);

            // Create the request body as a JSON object
            const data = {
                search_text: searchText
            };

            // Set up the configuration with the authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            // Use POST method to send the data
            const response = await axios.post('/api/v0/work/search', data, config);

            // Assuming the actual results are in response.data
            setSearchRes(response.data.nearby);
        } catch (error) {
            setSearchWasSuccess(false);
            console.error("Error during search:", error);
            return;
            // Handle the error based on your application's requirement
        }
        setSearchWasSuccess(true);
    }

    let forceGenButton = (
        <div>
            <br />
            <Row>
                <Button variant="secondary" onClick={genThread}>(+) Generate an Exact Response Thread</Button>
            </Row>
        </div>
    );

    return (
        <Container className="py-5">
            <Row className="justify-content-md-center">
          <img 
            src="/logo.png" 
            alt="Descriptive Alt Text"
            className="img-fluid rounded-custom" // Makes the image responsive
            style={{ maxWidth: '200px', height: 'auto' }}
          />
      </Row>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Ask a question..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </Col>
                <Col md={1}>
                    <Button variant="primary" onClick={execSearch}>Search</Button>
                </Col>
            </Row>
            {respIsLoading && loadingSpinner}
            {searchWasSuccess ? forceGenButton : null}
                {searchRes.map((obj, index) => (
                        <SearchCard
                            title={obj.question}
                            link={"http://localhost:3001/thread/" + obj._id}
                            previewText={obj.responsePreview}
                        />
                ))}
        </Container>
    );
}

/*
    {searchRes.map((obj) => (
    <SearchCard
        title={obj.question}
        link=https://localhost:3000/api/v0/work/thread/{obj._id}
        previewText={obj.responsePreview}
    />
    ))}
    */

export default Search;
