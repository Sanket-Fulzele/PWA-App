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
    avatar: 'https://ui-avatars.com/api/?name=Sanket+Fulzele&background=0D8ABC&color=fff&size=150'
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="page-title">My Profile</h2>
        <p className="text-muted">Manage your personal information</p>
      </div>
      
      <Card className="profile-card">
        <Card.Body>
          <div className="profile-top">
            <div className="avatar-section">
              <div className="avatar-container">
                <Image
                  src={user.avatar}
                  roundedCircle
                  className="profile-avatar"
                  alt="Profile"
                />
              </div>
              <h3 className="user-name mt-3">{user.name}</h3>
              <p className="user-role">{user.role}</p>
            </div>
          </div>

          <div className="profile-info mt-4">
            <h4 className="section-title">Personal Information</h4>
            <Row className="profile-details">
              <Col xs={12} md={12}>
                <div className="detail-item">
                  <label>Email</label>
                  <div className="detail-value">
                    <span>{user.email}</span>
                  </div>
                </div>
              </Col>
            <Col xs={12} md={12}>
                <div className="detail-item">
                  <label>Phone</label>
                  <div className="detail-value">
                    <span>{user.phone}</span>
                  </div>
                </div>
              </Col>
            <Col xs={12} md={12}>
                <div className="detail-item">
                  <label>Department</label>
                  <div className="detail-value">
                    <span>{user.department}</span>
                  </div>
                </div>
              </Col>
            <Col xs={12} md={12}>
                <div className="detail-item">
                  <label>Join Date</label>
                  <div className="detail-value">
                    <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
