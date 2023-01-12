import { createSlice } from '@reduxjs/toolkit';

const modify = (date) => {
    date = date.split('-');
    date = date.reverse();
    date = date.map(item => parseInt(item));
    date[1] = date[1] - 1;
    return date;
};

const getTotalBillsByDate = (bills) => {
    const res = [];
    let curr = 0;
    bills.forEach((bill, index) => {
        curr += bill.amount;
        if((index < bills.length - 1 && bill.date !== bills[index+1].date) || index === bills.length - 1)
        {
            res.push({
                date: bill.date,
                amount: curr
            })
            curr = 0;
        }
    });
    return res;
};

const billSlice = createSlice({
    name: 'bill',
    initialState: {
        bills: [],
        filteredBills: [],
        totalBillsByDate: [],
        totalBill: 0,
    },
    reducers: {
        addBill(state, action) {
            state.bills.push(action.payload);
            state.bills = [...state.bills].sort((a,b) => {
                let aD = modify(a.date);
                let bD = modify(b.date);
                return new Date(aD[0], aD[1], aD[2])-new Date(bD[0], bD[1], bD[2]);
            });
            state.totalBillsByDate = getTotalBillsByDate(state.bills);
            state.filteredBills = [...state.bills];
            state.totalBill = state.totalBill + action.payload.amount;
        },
        editBill(state, action) {
            state.totalBill -= state.bills.filter(bill => bill.id === action.payload.id)[0].amount;
            state.totalBill += action.payload.amount;
            state.bills = [...state.bills].map((bill) => {
                if(bill.id === action.payload.id)
                    return action.payload;
                else
                    return bill;
            });
            state.bills = [...state.bills].sort((a,b) => {
                let aD = modify(a.date);
                let bD = modify(b.date);
                return new Date(aD[0], aD[1], aD[2])-new Date(bD[0], bD[1], bD[2]);
            });
            state.totalBillsByDate = getTotalBillsByDate(state.bills);
            state.filteredBills = [...state.bills];
        },
        removeBill(state, action) {
            state.totalBill -= action.payload.amount;
            state.bills = [...state.bills].filter(bill => {
                return bill.id !== action.payload.id
            });
            state.totalBillsByDate = getTotalBillsByDate(state.bills);
            state.filteredBills = [...state.bills];
        },
        filterBill(state, action) {
            state.filteredBills = action.payload;
        }
    }
});

export const { addBill, editBill, removeBill, filterBill } = billSlice.actions;

export default billSlice.reducer;