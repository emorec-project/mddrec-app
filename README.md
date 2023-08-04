# MDD Recognition App

This application is composed of a Django backend and a React.js frontend. This repository is split into two main directories: `backend` for Django and `frontend-ts` for React.js.

## Prerequisites

- Python 3.7 or higher
- Node.js v14 or higher
- npm v6 or higher

## Backend Setup (Django)

We use [Poetry](https://python-poetry.org/) for dependency management in the backend. Here is how you can set it up:

1. Install Poetry: You can install Poetry by following the instructions on the [official Poetry website](https://python-poetry.org/docs/#installation).

2. Navigate to the `backend` directory: `cd backend`

3. Install dependencies using Poetry: `poetry install`

4. Activate the virtual environment: `poetry shell`

5. Run the Django server: `python manage.py runserver`

## Frontend Setup (React.js)

We use [npm](https://www.npmjs.com/) for managing dependencies in the frontend. Here is how you can set it up:

1. Navigate to the `frontend-ts` directory: `cd frontend-ts`

2. Install Node.js and npm: Follow the instructions on the [official npm website](https://www.npmjs.com/get-npm) to install Node.js and npm.

3. Install dependencies using npm: `npm install`

4. Start the React.js server: `npm start`

## Libraries used

### Backend

- Django
- Django Rest Framework
- Poetry
- Corsheaders

### Frontend

- React.js
- TypeScript
- Ant Design
- Axios
