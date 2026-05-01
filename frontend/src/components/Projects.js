import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const Projects = () => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', team: [] });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get(`${API_URL}/api/projects`);
    setProjects(res.data);
  };

  const handleOpen = (project = null) => {
    setEditingProject(project);
    setFormData(project ? { name: project.name, description: project.description, team: project.team.map(u => u._id) } : { name: '', description: '', team: [] });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = async () => {
    if (editingProject) {
      await axios.put(`${API_URL}/api/projects/${editingProject._id}`, formData);
    } else {
      await axios.post(`${API_URL}/api/projects`, formData);
    }
    fetchProjects();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/projects/${id}`);
    fetchProjects();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Projects
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
        Add Project
      </Button>
      <List sx={{ mt: 2 }}>
        {projects.map(project => (
          <ListItem key={project._id}>
            <ListItemText primary={project.name} secondary={project.description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleOpen(project)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(project._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {/* For simplicity, team selection is omitted; can be added with user list */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Projects;
