import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/navbar';
import Home from './pages/home';
import BillingCycles from './pages/billingCycles';
import CurrentBill from './pages/currentBill';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/billing_cycles' element={<BillingCycles />} />
          <Route path='/current_bill' element={<CurrentBill />} />
        </Routes>
      </Provider>
    </React.Fragment>
  );
}

export default App;
