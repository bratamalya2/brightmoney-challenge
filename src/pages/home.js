import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { v4 as uuidv4 } from 'uuid';
import AddBillForm from '../components/addBillForm';
import { addBill, filterBill } from '../store/billSlice';
import Bills from '../components/bills';
import CategoryDropdown from '../components/categoryDropdown';

function Home() {
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [show, setShow] = useState(false);
    const [currentCategories, setCurrentCategories] = useState([]);
    const dispatch = useDispatch();
    const totalBill = useSelector(state => state.bill.totalBill);
    const bills = useSelector(state => state.bill.bills);
    const filteredBills = useSelector(state => state.bill.filteredBills);

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
        dispatch(addBill({
            id: uuidv4(),
            desc,
            category,
            amount,
            date
        }))
    };
    const handleApplyFilters = () => {
        let x;
        if(currentCategories.length > 0) {
            x = [...bills].filter(bill => currentCategories.includes(bill.category));
            dispatch(filterBill(x));
        }
        else
            dispatch(filterBill(bills));
    }
    const [showFilter, setShowFilter] = useState(false);

    const handleCloseFilter = () => {
        setCurrentCategories([]);
        handleApplyFilters();
        setShowFilter(false);
    }
    const handleShowFilter = () => {
        if(currentCategories.length > 0)
            setCurrentCategories([]);
        handleApplyFilters();
        setShowFilter(true);
    }

    return (
        <React.Fragment>
            <Offcanvas show={showFilter} onHide={handleCloseFilter}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter bills by category</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CategoryDropdown currentCategories={currentCategories} setCurrentCategories={setCurrentCategories} />
                    <Button variant="primary" onClick={() => {
                        handleApplyFilters();
                        setShowFilter(false);
                    }} className='apply-filters-button'>
                        Apply Filters
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>

            <Bills
                bills={filteredBills}
                desc={desc}
                setDesc={setDesc}
                category={category}
                setCategory={setCategory}
                amount={amount}
                setAmount={setAmount}
                date={date}
                setDate={setDate}
            />
            <div className='bill-footer'>
                {
                bills.map(bill => bill.category).length === 0?
                    (
                        <Button variant="primary" onClick={handleShowFilter} disabled>
                            Filter Bills
                        </Button>
                    )
                    :
                    (
                        <Button variant="primary" onClick={handleShowFilter} active>
                            Filter Bills
                        </Button>
                    )
                }
                <span className='h3'>Total bill: Rs {totalBill}</span>
                <Button variant='primary' onClick={handleShow}>Add bill</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new bill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddBillForm setDesc={setDesc} setCategory={setCategory} setAmount={setAmount} setDate={setDate} />
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
        </React.Fragment>
    );
}

export default Home;