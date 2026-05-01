import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get('http://localhost:3000/api/tasks/dashboard/stats');
      setStats(res.data);
    };
    fetchStats();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6">Welcome, {user?.name}</Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Tasks
              </Typography>
              <Typography variant="h5">{stats.totalTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed Tasks
              </Typography>
              <Typography variant="h5">{stats.completedTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Tasks
              </Typography>
              <Typography variant="h5">{stats.pendingTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Overdue Tasks
              </Typography>
              <Typography variant="h5">{stats.overdueTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Tasks
        </Typography>
        <List>
          {stats.recentTasks?.map(task => (
            <ListItem key={task._id}>
              <ListItemText primary={task.title} secondary={`Assigned to: ${task.assignedTo?.name} | Project: ${task.project?.name}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Dashboard;