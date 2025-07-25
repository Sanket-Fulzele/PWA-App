import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import './CompletedTasks.css';

const CompletedTasks: React.FC = () => {
  // Sample completed tasks data
  const completedTasks = [
    {
      id: 1,
      title: 'Website Development',
      completedDate: '2025-07-20',
      status: 'Completed',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Mobile App Testing',
      completedDate: '2025-07-22',
      status: 'Completed',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Database Optimization',
      completedDate: '2025-07-23',
      status: 'Completed',
      priority: 'High'
    }
  ];

  return (
    <div className="completed-tasks-container">
      <h2 className="page-title">Completed Tasks</h2>
      
      <Card>
        <Card.Body>
          <ListGroup variant="flush">
            {completedTasks.map(task => (
              <ListGroup.Item key={task.id} className="task-item">
                <div className="task-header">
                  <h5 className="task-title">{task.title}</h5>
                  <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="task-details">
                  <span className="completion-date">
                    Completed on: {new Date(task.completedDate).toLocaleDateString()}
                  </span>
                  <span className="status-badge">
                    {task.status}
                  </span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CompletedTasks;
