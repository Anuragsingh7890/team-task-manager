# Team Task Manager

A full-stack application for managing team tasks with advanced features.

## Features Implemented
✅ Authentication (JWT, Signup/Login)  
✅ Role-based Access (Admin/Member)  
✅ Project Management (CRUD, team assignment)  
✅ Task Management (Create, assign, update status, priority, due dates)  
✅ Dashboard (Stats, overdue tasks, recent tasks)  
✅ Validations (Express-validator, Mongoose)  
✅ Responsive UI (Material-UI)  
✅ RESTful APIs (Well-structured)  
✅ Database Relationships (MongoDB/Mongoose)  

## Project Structure

- **backend/**: Node.js server with Express, MongoDB, JWT auth
  - models/: Mongoose models (User, Project, Task)
  - routes/: API routes (auth, projects, tasks)
  - controllers/: Route controllers with validations
  - middleware/: Auth middleware
  - server.js: Main server file

- **frontend/**: React application with Material-UI
  - components/: Reusable components (Login, Register, Dashboard, etc.)
  - context/: Auth context for state management
  - App.js: Main app with routing

## Prerequisites

- Node.js
- MongoDB (running on localhost:27017)

## Getting Started

### Backend
1. Navigate to `backend/` directory
2. Run `npm install`
3. Run `npm start`

### Frontend
1. Navigate to `frontend/` directory
2. Run `npm install`
3. Run `npm start`

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Projects
- GET /api/projects
- POST /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id

### Tasks
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- GET /api/tasks/dashboard/stats

## Usage

1. Register/Login as admin or member
2. Create projects and assign team members
3. Create tasks within projects, assign to users, set priority and due dates
4. View dashboard for stats and recent tasks
5. Update task status and manage projects