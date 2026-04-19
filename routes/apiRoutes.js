const express = require('express');
const { 
    authUser, 
    getProjects, 
    createProject, 
    getDashboardStats, 
    getContactRequests, 
    updateRequestStatus,
    submitContactForm 
} = require('../controllers/adminController');
const router = express.Router();

// User Auth
router.post('/login', authUser);

// Dashboard Statistics
router.get('/stats', getDashboardStats);

// Contact Requests
router.post('/contact', submitContactForm);
router.get('/requests', getContactRequests);
router.put('/requests/:id', updateRequestStatus);

// Projects
router.get('/projects', getProjects);
router.post('/projects', createProject);

module.exports = router;
