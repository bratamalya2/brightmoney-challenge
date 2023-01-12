import React from 'react';
import '../styles/addBillForm.css';

function EditBillForm({ desc, setDesc, category, setCategory, amount, setAmount, date, setDate })
{
    return (
        <React.Fragment>
            <form>
                <div className='individual-entry'>
                    <label htmlFor='description'>Description</label>
                    <input type='text' id='description' placeholder='add bill description' onInput={e => setDesc(e.target.value)} value={desc}/>
                </div>
                <div className='individual-entry'>
                    <label htmlFor='category'>Category</label>
                    <input type='text' id='category' placeholder='add bill category' onInput={e => setCategory(e.target.value)} value={category}/>
                </div>
                <div className='individual-entry'>
                    <label htmlFor='amount'>Amount</label>
                    <input type='number' id='amount' placeholder='add bill amount' onInput={e => setAmount(parseInt(e.target.value))} value={amount}/>
                </div>
                <div className='individual-entry'>
                    <label htmlFor='date'>Date</label>
                    <input type='date' id='date' onInput={e => setDate(e.target.value.split('-').reverse().join('-'))} value={date.split('-').reverse().join('-')}/>
                </div>
            </form>
        </React.Fragment>
    );
}

export default EditBillForm;