// src/pages/TextExample.js
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';

function TextExample() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handlemodalclose = async () => {
    setShow(false);
  }

  const handleClose = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      if (selectedJob) {

        await axios.delete(`https://resourzone-codeedex.onrender.com/admin-jobs/jobs/${selectedJob._id}`, config);
        fetchData(); // Refresh jobs list after deletion
      }
    } catch (error) {
      console.error('Error deleting the job:', error);
    } finally {
      setShow(false);
      setSelectedJob(null);
    }
  };

  const handleShow = (job) => {
    setSelectedJob(job);
    setShow(true);
  };

  const handleAddJobShow = () => {
    navigate('/add-job'); // Navigate to add job page without any job data
  };

  const handleEdit = () => {
    navigate('/add-job', { state: { job: selectedJob } });
  };

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get('https://resourzone-codeedex.onrender.com/admin-jobs/jobs/', config);
      setJobs(response.data.jobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button style={{ backgroundColor: '#08011b', marginRight: '4px' }} onClick={handleAddJobShow}>
          Add Job
        </Button>
      </div>
      <div className="d-flex flex-wrap">
        {jobs.map((job) => (
          <Card key={job._id} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{job.companyName}</Card.Subtitle>
              <Card.Text>Job Mode: {job.jobMode}</Card.Text>
              <Card.Text>Salary: ${job.salary}</Card.Text>
              <Button
                style={{ backgroundColor: '#08011b', width: '100%' }}
                onClick={() => handleShow(job)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal for viewing job details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob ? selectedJob.title : 'Job Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob ? (
            <div>
              <h5>{selectedJob.companyName}</h5>
              <p><strong>Job Mode:</strong> {selectedJob.jobMode}</p>
              <p><strong>Salary:</strong> ${selectedJob.salary}</p>
              <p><strong>Description:</strong> {selectedJob.description}</p>
            </div>
          ) : (
            <p>Loading job details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: '#08011b', marginRight: '4px' }} onClick={handlemodalclose}>Close</Button>
          <Button style={{ backgroundColor: '#08011b', marginRight: '4px' }} onClick={handleEdit}>Edit</Button>
          <Button style={{ backgroundColor: '#08011b', marginRight: '4px' }} onClick={handleClose}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TextExample;
