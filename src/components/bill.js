import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { removeBill, editBill } from '../store/billSlice';
import EditBillForm from './editBillForm';
import '../styles/bill.css';

function Bill({ bill, id, desc, setDesc, category, setCategory, amount, setAmount, date, setDate }) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const handleClose = () => {
        setDesc('');
        setCategory('');
        setAmount(0);
        setDate('');
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleSubmit = () => {
        setShow(false);
        dispatch(editBill({
            id,
            desc,
            category,
            amount,
            date
        }))
    };

    return (
        <span className='card'>
            <Card style={{ width: '18rem' }}>
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

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit current bill</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditBillForm
                                desc={desc}
                                setDesc={setDesc}
                                category={category}
                                setCategory={setCategory}
                                amount={amount}
                                setAmount={setAmount}
                                date={date}
                                setDate={setDate}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className='bill-card-edit-button-container'>
                        <Button variant='secondary' onClick={handleShow}>Edit</Button>
                        <Button variant='danger' onClick={() =>
                            dispatch(removeBill(bill))
                        }>Remove</Button>
                    </div>
                </Card.Body>
            </Card>
        </span>
    );
}

export default Bill;