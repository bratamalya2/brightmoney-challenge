import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import '../styles/billingCycles.css';

ChartJS.register(
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

function BillingCycles() {
    const bills = useSelector(state => state.bill.totalBillsByDate);
    const monthArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const [currentMonth, setCurrentMonth] = useState(1);
    const [currentYear, setCurrentYear] = useState(2023);
    const [dates, setDates] = useState([]);
    const [amounts, setAmounts] = useState([]);

    const data = {
        labels: dates.map(date => date.split('-').reverse().join('-')),
        datasets: [
            {
                label: 'Bill amount',
                data: amounts,
                backgroundColor: 'black',
                borderColor: 'red',
                tension: 0.4
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
            y: {
                beginAtZero: true
            }
        }
    };

    useEffect(() => {
        const currMonthBills = bills.filter(bill => {
                        const month = parseInt(bill.date.split('-')[1]);
                        const year = parseInt(bill.date.split('-')[2]);
                        return month === currentMonth && year === currentYear;
                    });
                    setDates(currMonthBills.map(bill => bill.date));
                    setAmounts(currMonthBills.map(bill => bill.amount));
    }, [currentMonth, currentYear, bills]);

    return (
        <div>
            <div>
                <form onSubmit={e => {
                    e.preventDefault();
                    const currMonthBills = bills.filter(bill => {
                        const month = parseInt(bill.date.split('-')[1]);
                        const year = parseInt(bill.date.split('-')[2]);
                        return month === currentMonth && year === currentYear;
                    });
                    setDates(currMonthBills.map(bill => bill.date));
                    setAmounts(currMonthBills.map(bill => bill.amount));
                }}>
                    <div className='billing-cycle-form-div'>
                        <label htmlFor='monthInput'>Pick a month:&nbsp;</label>
                        <select id='monthInput' name='month' value={currentMonth} onChange={(e) => setCurrentMonth(parseInt(e.target.value))}>
                            {
                                monthArray.map(
                                    (month, id) => <option key={id} value={id+1}>{month}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className='billing-cycle-form-div'>
                        <label htmlFor='yearInput'>Pick a year:&nbsp;</label>
                        <input id='yearInput' type='number' value={currentYear} onInput={e => setCurrentYear(parseInt(e.target.value))}/>
                    </div>
                    <input type='submit' value='Apply' />
                </form>
            </div>
            <Line
                data={data}
                options={options}
            >

            </Line>
        </div>
    );
}

export default BillingCycles;