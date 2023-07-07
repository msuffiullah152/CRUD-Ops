const express = require('express');
const app = express();
const port = 3000; // or any other port number you prefer

app.use(express.json()); // Enable JSON parsing of request bodies

// Define your sample resource data
let resources = [
  { id: 1, name: 'Resource 1' },
  { id: 2, name: 'Resource 2' },
  // Add more sample resources as needed
];

// Define routes for CRUD operations

// Get all resources
app.get('/resources', (req, res) => {
  res.json(resources);
});

// Get a specific resource by ID
app.get('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const resource = resources.find(r => r.id === id);
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).json({ message: 'Resource not found' });
  }
});

// Create a new resource
app.post('/resources', (req, res) => {
  const newResource = req.body;
  newResource.id = resources.length + 1; // Generate a new ID
  resources.push(newResource);
  res.status(201).json(newResource);
});

// Update a resource
app.put('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedResource = req.body;
  const index = resources.findIndex(r => r.id === id);
  if (index !== -1) {
    resources[index] = { ...resources[index], ...updatedResource };
    res.json(resources[index]);
  } else {
    res.status(404).json({ message: 'Resource not found' });
  }
});

// Delete a resource
app.delete('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = resources.findIndex(r => r.id === id);
  if (index !== -1) {
    const deletedResource = resources.splice(index, 1);
    res.json(deletedResource[0]);
  } else {
    res.status(404).json({ message: 'Resource not found' });
  }
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: 'Invalid route' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
