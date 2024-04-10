import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

axios.defaults.baseURL = 'http://localhost:3000';

const LoginComponent = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handlePhoneNumberSubmit = async () => {
      setLoading(true);
      try {
        await axios.post('/api/v0/auth/send-SMS-verification', { phoneNumber: phoneNumber });
        setStep(2);
        setError('');
      } catch (error) {
        setError('Failed to send verification code.');
        console.error('Error sending phone number', error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleLogin = async () => {
      setLoading(true);
      try {
        const response = await axios.post('/api/v0/auth/signin', {
            phoneNumber: phoneNumber,
            verificationCode: verificationCode
        });
        console.log('Login successful:', response);
        setError('');
        // Handle successful login here
        localStorage.setItem('token', response.data.token);
        navigate('/search');
      } catch (error) {
        setError('Login failed. Please try again.');
        console.error('Error logging in', error);
      } finally {
        setLoading(false);
      }
    };
  
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
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              {step === 1 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handlePhoneNumberSubmit} disabled={loading}>
                    {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Next'}
                  </Button>
                </>
              )}
              {step === 2 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Verification Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="success" onClick={handleLogin} disabled={loading}>
                    {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Login'}
                  </Button>
                </>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  

function Login() {
  return <LoginComponent />;
}

export default Login;