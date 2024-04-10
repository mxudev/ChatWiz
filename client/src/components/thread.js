import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, ListGroup, Card, Spinner } from 'react-bootstrap';
import ThreadCard from './threadCard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Thread() {
    const params = useParams();
    const thread_id = params.thread_id;
    const [threadQuestion, setThreadQuestion] = useState("");
    const [responseList, setResponseList] = useState([]);
    const [respIsLoading, setRespIsLoading] = useState(false);
  const token = localStorage.getItem('token');

    const handleUpvote = async (responseId) => {
        setResponseList((prevState) => {
          return prevState.map((response) => {
            if (response.id === responseId) {
              if (response.userDownvoted) {
                return { ...response, netUpvotes: response.netUpvotes + 2, userUpvoted: true, userDownvoted: false };
              } else if (!response.userUpvoted) {
                return { ...response, netUpvotes: response.netUpvotes + 1, userUpvoted: true, userDownvoted: false };
              }
            }
            return response;
          });
        });
        const data = {
            response_id: responseId,
            isUp: true
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.post('/api/v0/work/setVote', data, config);
        console.log("voteup response: " + response);
      };

      const handleDownvote = async(responseId) => {
        setResponseList((prevState) => {
          return prevState.map((response) => {
            if (response.id === responseId) {
              if (response.userUpvoted) {
                return { ...response, netUpvotes: response.netUpvotes - 2, userUpvoted: false, userDownvoted: true };
              } else if (!response.userDownvoted) {
                return { ...response, netUpvotes: response.netUpvotes - 1, userUpvoted: false, userDownvoted: true };
              }
            }
            return response;
          });
        });
        const data = {
            response_id: responseId,
            isUp: false
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.post('/api/v0/work/setVote', data, config);
        console.log("voteup response: " + response);
      };

    const genResp = async () => {
        const data = {
            thread_id: thread_id,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        setRespIsLoading(true);
        const response = await axios.post('/api/v0/work/generateResponse', data, config);

        const returnedResp = response.data.response;

        let newRespList = [...responseList];
        newRespList.push({
            text: returnedResp.text,
            netUpvotes: 0,
            userUpvoted: false,
            userDownvoted: false,
            id: returnedResp._id,
        });
        setResponseList(newRespList);

        setRespIsLoading(false);
        console.log("response haha!!!: "+response.data);
  };

  const forceGenButton = (
        <div>
            <br />
            <Row>
                <Button variant="secondary" onClick={genResp}>(+) Generate Another Response</Button>
            </Row>
        </div>
    );

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

  useEffect(() => {
        // Define the function that makes the API call
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.get(`/api/v0/work/getThread/${thread_id}`, config);
                setResponseList(response.data.responseList);
                setThreadQuestion(response.data.question);
                console.log(responseList);
            } catch (error) {
                console.error('Error fetching data: ', error);
                // Handle error appropriately
            }
        };

        // Call the function
        fetchData();
    }, []); // Empty dependency array means this effect runs once after initial render

    return (
        <Container className="py-5">
            <Row className="justify-content-md-center">
          <img 
            src="/logo.png" 
            alt="Descriptive Alt Text"
            className="img-fluid" // Makes the image responsive
            style={{ maxWidth: '100px', height: 'auto' }}
          />
      </Row>
            <h2>{threadQuestion}</h2>
            {responseList.map((obj, index) => (
                <ThreadCard
                    text={obj.text}
                    netUpvotes={obj.netUpvotes}
                    userUpvoted={obj.userUpvoted}
                    userDownvoted={obj.userDownvoted}
                    id={obj.id}
                    onUpvote={handleUpvote}
                    onDownvote={handleDownvote}
                />
            ))}
        {forceGenButton}
        {respIsLoading && loadingSpinner}
        </Container>
    );

}

export default Thread;
