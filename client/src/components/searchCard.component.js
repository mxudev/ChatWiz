import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Card } from 'react-bootstrap';

const truncate = (s, t) => {
    if(s.length < t) return s;

    let res = "";
    for(let i = 0; i < t - 3; i++) {
        res += s[i];
    }
    res += "...";

    return res;
}

const SearchCard = ({ title, link, previewText }) => {
    return (
        <a href={link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className="my-3 custom-card" style={{ width: 'auto', borderRadius: '20px', cursor: 'pointer' }}>
                <Card.Body>
                    <Card.Title>
                        {truncate(title, 180)}
                    </Card.Title>
                    <Card.Text style={{ color: 'grey' }}>
                        {truncate(previewText, 300)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </a>
    );
};

export default SearchCard;
