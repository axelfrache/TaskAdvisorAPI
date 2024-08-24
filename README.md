# TaskAdvisorAPI

The Task Management API is a backend solution built with Express.js, designed to manage tasks efficiently. It supports user authentication, task grouping via lists, and offers features like recurring tasks to streamline your task management workflow.

## 🚀 Get Started

### Prerequisites
- 🟢 Node.js
- 🐳 Docker
- 📦 Docker Compose

### Installation

**Clone the repository:**
```bash
git clone https://github.com/axelfrache/TaskAdvisorAPI.git
cd TaskAdvisorAPI
```

### 🐳 Running with Docker

**Build and start the application:**
```bash
docker-compose up --build
```

The API will be available at http://localhost:5000

### 🕹️ Usage

To interact with the Task Management API, follow these steps:

1. **Register a new user** through the /api/auth/register endpoint.
2. **Log in** to receive a JWT token via the /api/auth/login endpoint.
3. **Create, retrieve, update, and delete tasks and lists** using the provided endpoints.
4. **Organize tasks** by assigning them to lists and manage recurring tasks efficiently.

### 🌟 Features
- 🔐 **User Authentication**: Secure registration and login using JWT.
- 📋 **Task Management**: Create, update, and organize tasks efficiently.
- 🗂️ **List Management**: Group tasks into lists for better organization.
- 🔄 **Recurring Tasks**: Support for task repetition with flexible schedules.
- 🛠️ **Validation**: Robust input validation to ensure data integrity.

## 📊 API Endpoints

### 🔐 Authentication

- **POST /api/auth/register**
  - Register a new user.
  - **Body: { "username": "John Doe", "email": "john.doe@example.com", "password": "password123" }**
  
- **POST /api/auth/login**
  - Log in and receive a JWT token.
  - **Body: { "email": "john.doe@example.com", "password": "password123" }**

### 📋 Tasks

- **POST /api/tasks**
  - Create a new task.
  - **Headers: Authorization: Bearer <your_token_here>**
  - **Body**:
    ```json
    {
        "name": "Finish report",
        "description": "Complete the annual report",
        "dueDate": "2024-09-01T00:00:00Z",
        "repetition": "ONCE"
    }
    ```
      

- **GET /api/tasks**
  - Retrieve all tasks for the authenticated user.
  - **Headers: Authorization: Bearer <your_token_here>**


- **PUT /api/tasks**
    - Update a specific task.
    - **Headers: Authorization: Bearer <your_token_here>**
    - **Body**:
      ```json
      {
          "name": "Finish updated report",
          "description": "Complete the annual report with the latest data",
          "dueDate": "2024-09-05T00:00:00Z",
          "completed": true
      }
      ```
      

- **DELETE /api/tasks**
  - Delete multiple tasks.
  - **Headers: Authorization: Bearer <your_token_here>**
  - **Body**:
      ```json
      {
          "taskIds": ["<taskId1>", "<taskId2>"]
      }
      ```

### 🗂️ Lists
- **POST /api/lists**
    - Create a new list.
    - **Headers: Authorization: Bearer <your_token_here>**
    - **Body**:
      ```json
      {
          "name": "Work Projects",
          "description": "Tasks related to work projects."
      }
      ```
      

- **GET /api/lists**
    - Retrieve all lists for the authenticated user.
    - **Headers: Authorization: Bearer <your_token_here>**


- **POST /api/lists/<listId>/task**
    - Add a task to a specific list.
    - **Headers: Authorization: Bearer <your_token_here>**
    - **Body**:
      ```json
      {
          "taskId": "<taskId>"
      }
      ```
      

- **DELETE /api/lists/<listId>/task**
  - Remove a task from a specific list.
  - **Headers: Authorization: Bearer <your_token_here>**