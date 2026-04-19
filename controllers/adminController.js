const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { Blog, Project } = require('../models/Content');
const ContactRequest = require('../models/ContactRequest');

// @desc    Auth user & get token
// @route   POST /api/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', {
                expiresIn: '30d',
            }),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const projectCount = await Project.countDocuments();
        const blogCount = await Blog.countDocuments();
        const requestCount = await ContactRequest.countDocuments();
        const pendingRequests = await ContactRequest.countDocuments({ status: 'pending' });

        // Mock chart data (last 7 days)
        // In a real app, you'd aggregate timestamps from the DB
        const chartData = [
            { day: 'Mon', count: 4 },
            { day: 'Tue', count: 7 },
            { day: 'Wed', count: 5 },
            { day: 'Thu', count: 9 },
            { day: 'Fri', count: 12 },
            { day: 'Sat', count: 8 },
            { day: 'Sun', count: 15 },
        ];

        res.json({
            projectCount,
            blogCount,
            requestCount,
            pendingRequests,
            chartData
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all contact requests
// @route   GET /api/requests
// @access  Private/Admin
const getContactRequests = async (req, res) => {
    try {
        const requests = await ContactRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update request status
// @route   PUT /api/requests/:id
// @access  Private/Admin
const updateRequestStatus = async (req, res) => {
    try {
        const request = await ContactRequest.findById(req.params.id);
        if (request) {
            request.status = req.body.status || request.status;
            const updatedRequest = await request.save();
            res.json(updatedRequest);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newRequest = new ContactRequest({
            name,
            email,
            subject,
            message
        });
        const createdRequest = await newRequest.save();
        res.status(201).json(createdRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    const projects = await Project.find({});
    res.json(projects);
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
    const { title, description, category, technologies, image } = req.body;
    const project = new Project({
        title,
        description,
        category,
        technologies,
        image,
    });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
};

module.exports = { 
    authUser, 
    getProjects, 
    createProject, 
    getDashboardStats, 
    getContactRequests, 
    updateRequestStatus,
    submitContactForm 
};
