import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const Tasks = () => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', assignedTo: '', project: '', status: 'pending', priority: 'medium', dueDate: '' });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/api/tasks`);
    setTasks(res.data);
  };

  const fetchProjects = async () => {
    const res = await axios.get(`${API_URL}/api/projects`);
    setProjects(res.data);
  };

  const fetchUsers = async () => {
    // Assuming an endpoint to get users; for now, use team from projects or add endpoint
    // For simplicity, skip or add later
  };

  const handleOpen = (task = null) => {
    setEditingTask(task);
    setFormData(task ? {
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo?._id || '',
      project: task.project?._id || '',
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : ''
    } : { title: '', description: '', assignedTo: '', project: '', status: 'pending', priority: 'medium', dueDate: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async () => {
    if (editingTask) {
      await axios.put(`${API_URL}/api/tasks/${editingTask._id}`, formData);
    } else {
      await axios.post(`${API_URL}/api/tasks`, formData);
    }
    fetchTasks();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Tasks
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
        Add Task
      </Button>
      <List sx={{ mt: 2 }}>
        {tasks.map(task => (
          <ListItem key={task._id}>
            <ListItemText
              primary={task.title}
              secondary={`Status: ${task.status} | Priority: ${task.priority} | Assigned to: ${task.assignedTo?.name} | Project: ${task.project?.name}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleOpen(task)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(task._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Assigned To</InputLabel>
            <Select value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}>
              {users.map(user => (
                <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Priority</InputLabel>
            <Select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Tasks;
