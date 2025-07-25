import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import './Profile.css';

const Profile: React.FC = () => {
  // Sample user data
  const user = {
    name: 'Sanket Fulzele',
    email: 'sanket.fulzele@example.com',
    role: 'Software Developer',
    department: 'Engineering',
    joinDate: '2024-01-15',
    phone: '+1 234-567-8900',
    avatar: 'https://via.placeholder.com/150'
  };

  return (
    <div className="profile-container">
      <h2 className="page-title">My Profile</h2>
      
      <Card className="profile-card">
        <Card.Body>
          <Row>
            <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
              <div className="avatar-container">
                <Image
                  src={user.avatar}
                  roundedCircle
                  className="profile-avatar"
                  alt="Profile"
                />
              </div>
            </Col>
            <Col xs={12} md={8}>
              <div className="profile-details">
                <div className="detail-item">
                  <label>Name:</label>
                  <span>{user.name}</span>
                </div>
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{user.email}</span>
                </div>
                <div className="detail-item">
                  <label>Role:</label>
                  <span>{user.role}</span>
                </div>
                <div className="detail-item">
                  <label>Department:</label>
                  <span>{user.department}</span>
                </div>
                <div className="detail-item">
                  <label>Join Date:</label>
                  <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <label>Phone:</label>
                  <span>{user.phone}</span>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
