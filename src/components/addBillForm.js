import React from 'react';
import '../styles/addBillForm.css';

function AddBillForm({ setDesc, setCategory, setAmount, setDate })
{
    return (
        <React.Fragment>
            <form>
                <div className='individual-entry'>
                    <label htmlFor='description'>Description</label>
                    <input type='text' id='description' placeholder='add bill description' onInput={e => setDesc(e.target.value)}/>
                </div>
                <div className='individual-entry'>
                    <label htmlFor='category'>Category</label>
                    <input type='text' id='category' placeholder='add bill category' onInput={e => setCategory(e.target.value)}/>
                </div>
                <div className='individual-entry'>
                    <label htmlFor='amount'>Amount</label>
                    <input type='number' id='amount' placeholder='add bill amount' onInput={e => setAmount(parseInt(e.target.value))}/>
                </div>
                <div className='individual-entry'>
                    <label htmlFor='date'>Date</label>
                    <input type='date' id='date' onInput={e => setDate(e.target.value.split('-').reverse().join('-'))}/>
                </div>
            </form>
        </React.Fragment>
    );
}

export default AddBillForm;