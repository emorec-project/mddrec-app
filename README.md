# MDD Recognition App

This application is composed of a FastAPI backend and a React.js frontend. This repository is split into two main directories: `backend` for FastAPI and `frontend-ts` for React.js.

## Prerequisites

- [Python 3.9](https://www.python.org/downloads/release/python-3913/)
- [Node.js v14 or higher](https://nodejs.org/en/download)

## Backend Setup (FastAPI)

We use `pip` and a `requirements.txt` file for dependency management in the backend. Here's how you can set it up:

1. Navigate to the `backend` directory: `cd backend`
2. Install the required Python packages: `pip install -r requirements.txt`
3. Run the FastAPI application using `uvicorn`: `uvicorn server:app --reload`


## Frontend Setup (React.js)

We use [npm](https://www.npmjs.com/) for managing dependencies in the frontend. Here's how you can set it up:

1. Navigate to the `frontend-ts` directory: `cd frontend-ts`
3. Install dependencies using npm: `npm install`
4. Start the React.js server: `npm start`

## Libraries used

### Backend

- FastAPI
- Uvicorn

### Frontend

- React.js
- TypeScript
- Ant Design
- Axios
