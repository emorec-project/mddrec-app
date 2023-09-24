# Running the Backend with Python Virtual Environment

This guide will help you set up and run the backend of the application using a Python virtual environment.

## Prerequisites

- Python 3.11 or higher installed on your system. You can download it from the official Python website.

## Steps

### 1. Navigate to the backend directory

Open a terminal and navigate to the backend directory of the project.

```bash
cd path/to/backend
```

### 2. Create a Python virtual environment

Run the following command to create a new Python virtual environment in the backend directory. This will create a new directory named venv.

```bash
python -m venv venv
```

### 3. Activate the virtual environment

Before you can start using the virtual environment, you need to activate it.

- On Windows, run:

```bash
.\venv\Scripts\activate
```

- On Unix or MacOS, run:

```bash
source venv/bin/activate
```

If the virtual environment was activated successfully, your terminal prompt should now start with (venv).

### 4. Install the required Python packages

With the virtual environment activated, you can now install the required Python packages. The packages are listed in the requirements.txt file. To install them, run:

```bash
python -m pip install -r requirements.txt
```

### 5. Run the FastAPI application

With all the requirements installed, you can now run the FastAPI application using uvicorn. Before this you can configure a profile:

- On Windows:

```bash
set PROFILE=test&& uvicorn server:app --reload
```
- On Unix or MacOS:

```bash
PROFILE=prod uvicorn server:app --reload
```

The application should now be running at http://localhost:8000.

Remember to always activate the virtual environment before you start working on the project. When you're done, you can deactivate the virtual environment by running deactivate in the terminal.

### 6. Set up a local mongo collection

Instead of using Atlas, you can use a local mongo for development, open the docker desktop app.
After that enter (inside the backend dir):

```bash
docker compose up -d
```