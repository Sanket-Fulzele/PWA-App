import React from 'react'
import "./dashboard.css";
import { useNavigate } from 'react-router-dom';
import { Search, InfoCircle } from 'react-bootstrap-icons';

interface Task {
  id: number;
  supplierName: string;
  address: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  pickupNumber: string;
  pickupType: 'PickUp' | 'Deliver';
}

const Dashboard = () => {
  const navigate = useNavigate();

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

    const handleDetailsClick = (taskId: number) => {
    console.log('Viewing details for task:', taskId);
    navigate("/scheduled-tasks/details?id=" + taskId);
  };

  return (
    <div className='page-container'>


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
  )
}

export default Dashboard