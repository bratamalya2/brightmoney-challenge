import React from 'react';
import { useSelector } from 'react-redux';

function CategoryDropdown({ currentCategories, setCurrentCategories }) {
    const availableCategories = useSelector(state => state.bill.bills.map(bill => bill.category));

    return (
        <React.Fragment>
            {
                availableCategories.map((category, index) =>
                    <div key={index}>
                        <input type='checkbox' id={`bill-category-${index}`} onChange={
                            (e) => {
                                if(currentCategories.includes(category))
                                    setCurrentCategories(curr => curr.filter(cat => cat !== category));
                                else
                                    setCurrentCategories(curr => [...curr, category]);
                            }
                        }/>
                        <label htmlFor={`bill-category-${index}`}>&nbsp;&nbsp;{category}</label>
                    </div>
                )
            }
        </React.Fragment>
    );
}

export default CategoryDropdown;