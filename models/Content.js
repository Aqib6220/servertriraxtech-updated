const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, default: 'TriraxTech Team' },
    image: { type: String },
    tags: [String],
    isPublished: { type: Boolean, default: false }
}, {
    timestamps: true
});

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    problem: { type: String },
    solution: { type: String },
    result: { type: String },
    image: { type: String },
    category: { type: String },
    technologies: [String],
    link: { type: String }
}, {
    timestamps: true
});

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String },
    content: { type: String, required: true },
    avatar: { type: String }
}, {
    timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);
const Project = mongoose.model('Project', projectSchema);
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = { Blog, Project, Testimonial };
