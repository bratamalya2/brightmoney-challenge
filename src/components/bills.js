import React from 'react';
import Bill from './bill';
import '../styles/bills.css';

function Bills({ bills, desc, setDesc, category, setCategory, amount, setAmount, date, setDate })
{
    return (
        <div className='bills container'>
            {bills.map(bill => 
                <Bill
                    bill={bill}
                    key={bill.id}
                    id={bill.id}
                    desc={desc}
                    setDesc={setDesc}
                    category={category}
                    setCategory={setCategory}
                    amount={amount}
                    setAmount={setAmount}
                    date={date}
                    setDate={setDate}
                />)}
        </div>
    );
}

export default Bills;