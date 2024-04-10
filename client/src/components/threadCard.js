import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Card } from 'react-bootstrap';


const ThreadCard = ({ text, netUpvotes, userUpvoted, userDownvoted, id, onUpvote, onDownvote }) => {
    return (
        <Card className="my-3 custom-card" style={{ width: 'auto', borderRadius: '20px' }}>
            <Card.Body>
                <Card.Text style={{ color: 'grey' }}>
                    {text}
                </Card.Text>

            </Card.Body>
            <Card.Footer style={{ textAlign: 'right' }}>
                <button
                    className="btn"
                    style={{
                        background: userUpvoted ? 'grey' : 'initial',
                        border: 'none',
                    }}
                    onClick={() => {onUpvote(id)}}
                >
                    👍 {/* Replace with icon if needed */}
                </button>
                <span>{netUpvotes}</span>
                <button
                    className="btn"
                    style={{
                        background: userDownvoted ? 'grey' : 'initial',
                        border: 'none',
                    }}
                    onClick={() => {onDownvote(id)}}
                >
                    👎 {/* Replace with icon if needed */}
                </button>
            </Card.Footer>
        </Card>
    );
};

export default ThreadCard;
