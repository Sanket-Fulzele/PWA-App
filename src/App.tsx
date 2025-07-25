import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Container,
  Navbar,
  Offcanvas,
  Nav,
  Button
} from 'react-bootstrap';
import './App.css';
import Barcode from './components/Barcode/Barcode';
import { List as ListIcon, ChevronDown, ChevronRight } from 'react-bootstrap-icons';
import Dashboard from './components/Dashboard/Dashboard';
import ScheduledTaskList from './components/ScheduledTasks/ScheduledTaskList/ScheduledTaskList';
import ScheduledTaskDetails from './components/ScheduledTasks/ScheduledTaskDetails/ScheduledTaskDetails';
import CompletedTasks from './components/CompletedTasks/CompletedTasks';
import Profile from './components/Profile/Profile';
import Camera from './components/Camera/Camera';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);
  const toggleSubmenu = () => setShowSubmenu(!showSubmenu);

  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <Navbar bg="light" expand={false} fixed="top" className="mobile-header">
          <Container fluid>
            <Button
              variant="link"
              onClick={handleShowSidebar}
              className="sidebar-toggle"
              aria-label="Open menu"
            >
              <ListIcon size={24} />
            </Button>
            <Navbar.Brand className="mx-auto">Sanket</Navbar.Brand>
          </Container>
        </Navbar>

        {/* Sidebar */}
      <Offcanvas show={showSidebar} onHide={handleCloseSidebar} placement="start">
  <Offcanvas.Header closeButton closeVariant="white" className="bg-primary text-white py-2">
    <Offcanvas.Title className="fs-6">Menu</Offcanvas.Title>
  </Offcanvas.Header>
  <Offcanvas.Body className="d-flex flex-column p-2" style={{ height: 'calc(100vh - 56px)' }}>
    <div className="flex-grow-1">
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/" onClick={handleCloseSidebar} className="py-1">
          Dashboard
        </Nav.Link>
        
        {/* Scheduled Tasks with Submenu */}
        <div className="submenu-container">
          <Nav.Link 
            onClick={toggleSubmenu} 
            className="d-flex justify-content-between align-items-center py-1"
          >
            <span>Scheduled Tasks</span>
            {showSubmenu ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </Nav.Link>
          {showSubmenu && (
            <div className="submenu-items">
              <Nav.Link 
                as={Link} 
                to="/scheduled-tasks/list" 
                onClick={handleCloseSidebar}
                className="submenu-item py-1"
              >
                List
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/scheduled-tasks/details" 
                onClick={handleCloseSidebar}
                className="submenu-item py-1"
              >
                Task Details
              </Nav.Link>
            </div>
          )}
        </div>
        
        <Nav.Link as={Link} to="/completed-tasks" onClick={handleCloseSidebar} className="py-1">
          Completed Tasks
        </Nav.Link>
        <Nav.Link as={Link} to="/barcode" onClick={handleCloseSidebar} className="py-1">
          Barcode
        </Nav.Link>
        <Nav.Link as={Link} to="/profile" onClick={handleCloseSidebar} className="py-1">
          My Profile
        </Nav.Link>
        <Nav.Link as={Link} to="/camera" onClick={handleCloseSidebar} className="py-1">
          Camera
        </Nav.Link>
      </Nav>
    </div>
    
    {/* Logout Button - Fixed at bottom */}
    <div className="border-top pt-2 mt-auto">
      <Button 
        variant="danger" 
        size="sm" 
        className="w-100"
        onClick={handleCloseSidebar}
      >
        Logout
      </Button>
    </div>
  </Offcanvas.Body>
</Offcanvas>

        {/* Main Content */}
        <main className="main-content">
          <Container fluid>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/scheduled-tasks/list" element={<ScheduledTaskList />} />
              <Route path="/scheduled-tasks/details" element={<ScheduledTaskDetails />} />
              <Route path="/completed-tasks" element={<CompletedTasks />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/barcode" element={<Barcode />} />
              <Route path="/camera" element={<Camera />} />
            </Routes>
          </Container>
        </main>
      </div>
    </Router>
  );
}

export default App;