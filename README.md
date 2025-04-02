# Forum Project
This project consists of a backend and a frontend that need to be set up separately.

## Prerequisites

Make sure you have the following installed:

Node.js (LTS recommended)

npm (comes with Node.js)

## Installation
1. **Set up the Backend**
    ```sh
    cd backend
    npm install

2. **Create a .env file in the backend directory and add the following:**
    ```sh
    PORT=3001
    MONGO_URI=mongodb+srv://user1:harCIsiJJE91I8e0@cluster0.wrbl6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    SECRET=oqiwndqondasndaskajsnd

3. **Set up the Frontend**
    ```sh
    cd frontend
    npm install

4. **Create a .env file in the forum_project directory and add the following:**
    ```sh
    NEXT_PUBLIC_PORT=3001

## Running the Project
Run the following commands in separate terminals:

1. **Start the Backend**
    ```sh
    cd backend
    npm run dev

2. **Start the Frontend**
    ```sh
    cd frontend
    cd forum_project
    npm run dev

Your project should now be running!

## Troubleshooting
If you encounter any issues, make sure:

✅ You have installed all dependencies (npm install in both directories)

✅ Your .env files are correctly set up

✅ You are running npm run dev in both directories

