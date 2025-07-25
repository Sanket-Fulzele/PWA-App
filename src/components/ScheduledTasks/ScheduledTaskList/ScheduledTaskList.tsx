import React, { useState } from 'react';
import { Search } from 'react-bootstrap-icons';
import "./scheduledTaskList.css";

const ScheduledTaskList = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    pickupNumber: '',
    address: '',
    pickupType: 'All'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your search logic here
    console.log('Searching with criteria:', searchCriteria);
  };

  return (
    <div className='mobile-task-container'>
      <h2 className='mobile-search-title'>Search by</h2>
      <form onSubmit={handleSearch} className='mobile-search-form'>
        <div className='mobile-form-row'>
          <label htmlFor='pickupNumber' className='mobile-form-label'>Pickup Number:</label>
          <input
            type='text'
            className='mobile-form-control'
            id='pickupNumber'
            name='pickupNumber'
            value={searchCriteria.pickupNumber}
            placeholder='Enter Pickup Number'
            onChange={handleInputChange}
          />
        </div>
        
        <div className='mobile-form-row'>
          <label htmlFor='address' className='mobile-form-label'>Address:</label>
          <input
            type='text'
            className='mobile-form-control'
            id='address'
            name='address'
            value={searchCriteria.address}
            placeholder='Enter Address'
            onChange={handleInputChange}
          />
        </div>
        
        <div className='mobile-form-row'>
          <label htmlFor='pickupType' className='mobile-form-label'>Pickup Type:</label>
          <select
            className='mobile-form-select'
            id='pickupType'
            name='pickupType'
            value={searchCriteria.pickupType}
            onChange={handleInputChange}
          >
            <option value='All'>All</option>
            <option value='PickUp'>PickUp</option>
            <option value='Deliver'>Deliver</option>
          </select>
        </div>
        
        <button type='submit' className='mobile-search-button'>
          <Search className='mobile-search-icon' />
          Search
        </button>
      </form>
    </div>
  );
};

export default ScheduledTaskList;