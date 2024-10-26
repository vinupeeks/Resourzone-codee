import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container, Card } from 'react-bootstrap';

function AddJob() {
    const location = useLocation();
    const navigate = useNavigate();
    const editingJob = location.state?.job;

    // Initialize state for job details
    const [jobDetails, setJobDetails] = useState({
        title: '',
        jobMode: '',
        salary: '',
        description: '',
        companyName: ''
    });

    // Capitalize the first letter of jobMode for display
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    useEffect(() => {
        if (editingJob) {
            // Capitalize jobMode when editing
            setJobDetails({
                ...editingJob,
                jobMode: capitalizeFirstLetter(editingJob.jobMode)
            });
            // console.log('Editing Job:', editingJob);
        }
    }, [editingJob]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log('Changed:', name, value); // Log changes
        // Update jobDetails with the capitalized jobMode for display
        setJobDetails((prevDetails) => ({
            ...prevDetails,
            [name]: name === 'jobMode' ? value.toUpperCase() : value, // Store jobMode in uppercase
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Submitting job details:', jobDetails); // Check what is being sent
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // Prepare payload
        const payload = {
            ...jobDetails,
            jobMode: jobDetails.jobMode // Already stored as uppercase
        };

        try {
            if (editingJob) {
                await axios.put(`https://resourzone-codeedex.onrender.com/admin-jobs/jobs/${editingJob._id}`, payload, config);
                alert('Job updated successfully!');
            } else {
                await axios.post('https://resourzone-codeedex.onrender.com/admin-jobs/add', payload, config);
                alert('Job added successfully!');
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving job:', error);
            alert('An error occurred while saving the job. Please try again.');
        }
    };

    return (
        <Container className="my-5">
            <Card>
                <Card.Body>
                    <Card.Title className="text-center">{editingJob ? 'Edit Job' : 'Add New Job'}</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formJobTitle">
                            <Form.Label>Job Title:</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={jobDetails.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter job title"
                            />
                        </Form.Group>
                        <Form.Group controlId="formCompanyName">
                            <Form.Label>Company Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="companyName"
                                value={jobDetails.companyName}
                                onChange={handleChange}
                                required
                                placeholder="Enter company name"
                            />
                        </Form.Group>
                        <Form.Group controlId="formJobMode">
                            <Form.Label>Job Mode:</Form.Label>
                            <Form.Select
                                name="jobMode"
                                value={jobDetails.jobMode}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select job mode</option>
                                <option value="FULL-TIME">Full-time</option>
                                <option value="PART-TIME">Part-time</option>
                                <option value="REMOTE">Remote</option>
                                <option value="HYBRID">Hybrid</option>
                                <option value="INTERNSHIP">Internship</option>
                                <option value="CONTRACT">Contract</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formSalary">
                            <Form.Label>Salary:</Form.Label>
                            <Form.Control
                                type="number"
                                name="salary"
                                value={jobDetails.salary}
                                onChange={handleChange}
                                required
                                placeholder="Enter salary"
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={jobDetails.description}
                                onChange={handleChange}
                                required
                                placeholder="Enter job description"
                                rows={4}
                            />
                        </Form.Group>
                        <div className="text-center mt-4">
                            <Button style={{ backgroundColor: '#08011b', marginRight: '4px' }} type="submit">
                                {editingJob ? 'Save Changes' : 'Add Job'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AddJob;
