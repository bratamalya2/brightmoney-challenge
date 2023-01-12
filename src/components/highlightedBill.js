import React from 'react';
import Card from 'react-bootstrap/Card';
import '../styles/highlightedBill.css';

function HighlightedBill({bill})
{
    return (
        <span className='highlighted-bill'>
            <Card style={{ width: '18rem' }} bg='warning'>
                <Card.Header>
                    <Card.Title className='text-primary'>
                        {bill.desc}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className='mb-2 text-primary text-opacity-75'>{bill.category}</Card.Subtitle>
                    <Card.Text className='text-secondary'>
                        Amount: Rs {bill.amount}
                    </Card.Text>
                    <Card.Text className='text-secondary'>
                        Bill date: {bill.date}
                    </Card.Text>
                </Card.Body>
            </Card>
        </span>
    );
}

export default HighlightedBill;