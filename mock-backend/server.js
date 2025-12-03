import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// In-memory stores
let projects = [];
let services = [];
let contacts = [];

// simple token for dev
const DEV_TOKEN = 'dev-token-123';

// Auth (root, no /api)
app.post('/signup', (req, res) => {
  const { firstname, lastname, email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });
  return res.status(201).json({ user: { firstname, lastname, email } });
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });
  return res.json({ token: DEV_TOKEN });
});

// Auth middleware for /api/*
function auth(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : h;
  if (token !== DEV_TOKEN) return res.status(401).json({ message: 'Unauthorized' });
  next();
}

// Helpers
function id() { return Math.random().toString(36).slice(2, 10); }

// Projects
app.get('/api/projects', (req, res) => res.json(projects));
app.get('/api/projects/:id', (req, res) => {
  const x = projects.find(p => p._id === req.params.id);
  if (!x) return res.status(404).json({ message: 'Not found' });
  res.json(x);
});
app.post('/api/projects', auth, (req, res) => {
  const { title, description, completion } = req.body || {};
  if (!title) return res.status(400).json({ message: 'title required' });
  const x = { _id: id(), title, description: description || '', completion: completion || null };
  projects.push(x);
  res.status(201).json(x);
});
app.put('/api/projects/:id', auth, (req, res) => {
  const i = projects.findIndex(p => p._id === req.params.id);
  if (i < 0) return res.status(404).json({ message: 'Not found' });
  projects[i] = { ...projects[i], ...req.body };
  res.json(projects[i]);
});
app.delete('/api/projects/:id', auth, (req, res) => {
  projects = projects.filter(p => p._id !== req.params.id);
  res.status(204).end();
});
app.delete('/api/projects', auth, (req, res) => { projects = []; res.status(204).end(); });

// Services
app.get('/api/services', (req, res) => res.json(services));
app.get('/api/services/:id', (req, res) => {
  const x = services.find(p => p._id === req.params.id);
  if (!x) return res.status(404).json({ message: 'Not found' });
  res.json(x);
});
app.post('/api/services', auth, (req, res) => {
  const { title, description } = req.body || {};
  if (!title) return res.status(400).json({ message: 'title required' });
  const x = { _id: id(), title, description: description || '' };
  services.push(x);
  res.status(201).json(x);
});
app.put('/api/services/:id', auth, (req, res) => {
  const i = services.findIndex(p => p._id === req.params.id);
  if (i < 0) return res.status(404).json({ message: 'Not found' });
  services[i] = { ...services[i], ...req.body };
  res.json(services[i]);
});
app.delete('/api/services/:id', auth, (req, res) => {
  services = services.filter(p => p._id !== req.params.id);
  res.status(204).end();
});
app.delete('/api/services', auth, (req, res) => { services = []; res.status(204).end(); });

// Contacts
app.get('/api/contacts', (req, res) => res.json(contacts));
app.get('/api/contacts/:id', (req, res) => {
  const x = contacts.find(p => p._id === req.params.id);
  if (!x) return res.status(404).json({ message: 'Not found' });
  res.json(x);
});
app.post('/api/contacts', auth, (req, res) => {
  const { firstname, lastname, email } = req.body || {};
  if (!firstname || !lastname || !email) return res.status(400).json({ message: 'firstname, lastname, email required' });
  const x = { _id: id(), firstname, lastname, email };
  contacts.push(x);
  res.status(201).json(x);
});
app.put('/api/contacts/:id', auth, (req, res) => {
  const i = contacts.findIndex(p => p._id === req.params.id);
  if (i < 0) return res.status(404).json({ message: 'Not found' });
  contacts[i] = { ...contacts[i], ...req.body };
  res.json(contacts[i]);
});
app.delete('/api/contacts/:id', auth, (req, res) => {
  contacts = contacts.filter(p => p._id !== req.params.id);
  res.status(204).end();
});
app.delete('/api/contacts', auth, (req, res) => { contacts = []; res.status(204).end(); });

const port = process.env.PORT || 4000;
// Seed demo data for visual verification
projects = [
  {
    _id: id(),
    title: 'Demo Project',
    description: 'Seeded demo item rendered from mock backend',
    completion: null,
    img: '/assets/project1.jpg',
    role: 'Developer',
    link: '/assets/hyperopt_results_20250722_152314.csv',
    download: true,
  },
];
services = [
  {
    _id: id(),
    title: 'Web Development',
    description: 'React, Vite, REST APIs',
    icon: 'FaCode',
  },
  {
    _id: id(),
    title: 'Backend & Databases',
    description: 'Node, Express, SQL/NoSQL',
    icon: 'FaDatabase',
  },
];
contacts = [
  { _id: id(), firstname: 'Ada', lastname: 'Lovelace', email: 'ada@example.com' },
];

app.listen(port, () => console.log(`Mock backend listening on http://localhost:${port}`));
