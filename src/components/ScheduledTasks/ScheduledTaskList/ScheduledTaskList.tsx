import React, { useState } from 'react';
import { Search, InfoCircle } from 'react-bootstrap-icons';
import "./scheduledTaskList.css";

interface Task {
  id: number;
  supplierName: string;
  address: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  pickupNumber: string;
  pickupType: 'PickUp' | 'Deliver';
}

const ScheduledTaskList = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    pickupNumber: '',
    address: '',
    pickupType: 'All'
  });

  const tasksData: Task[] = [
    {
      id: 1,
      supplierName: 'ABC Suppliers',
      address: '123 Main St, Cityville',
      status: 'Pending',
      pickupNumber: 'PU-1001',
      pickupType: 'PickUp'
    },
    {
      id: 2,
      supplierName: 'XYZ Distributors',
      address: '456 Oak Ave, Townsville',
      status: 'In Progress',
      pickupNumber: 'PU-1002',
      pickupType: 'Deliver'
    },
    {
      id: 3,
      supplierName: 'Global Goods Inc.',
      address: '789 Pine Rd, Villageton',
      status: 'Completed',
      pickupNumber: 'PU-1003',
      pickupType: 'PickUp'
    },
    {
      id: 4,
      supplierName: 'Quick Ship Co.',
      address: '321 Elm Blvd, Metropolis',
      status: 'Cancelled',
      pickupNumber: 'PU-1004',
      pickupType: 'Deliver'
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching with criteria:', searchCriteria);
  };

  const handleDetailsClick = (taskId: number) => {
    console.log('Viewing details for task:', taskId);
  };

  return (
    <div className='mobile-task-container'>
      <h2 className='mobile-search-title'>Search By</h2>
      <form onSubmit={handleSearch} className='mobile-search-form'>
        <div className='mobile-form-row'>
          <label htmlFor='pickupNumber' className='mobile-form-label'>Pickup Number</label>
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
          <label htmlFor='address' className='mobile-form-label'>Address</label>
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
          <label htmlFor='pickupType' className='mobile-form-label'>Pickup Type</label>
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

      <div className='task-cards-container'>
        {tasksData.map((task) => (
          <div key={task.id} className='task-card'>
            <div className='task-card-header'>
              <h3 className='supplier-name'>{task.supplierName}</h3>
              <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                {task.status}
              </span>
            </div>
            <div className='task-card-body'>
              <p className='card-address'>{task.address}</p>
              <div className='card-meta'>
                <span>#{task.pickupNumber}</span>
                <span>{task.pickupType}</span>
              </div>
            </div>
            <button 
              className='details-button'
              onClick={() => handleDetailsClick(task.id)}
            >
              <InfoCircle className='details-icon' />
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledTaskList;
