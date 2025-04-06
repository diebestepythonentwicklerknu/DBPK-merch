# Running the Project with Docker

This section provides instructions for setting up and running the project using Docker.

## Prerequisites

- Ensure Docker and Docker Compose are installed on your system.
- Python version 3.9 is used in the Dockerfile.

## Build and Run Instructions

1. Build the Docker image and start the services:

   ```bash
   docker-compose up --build
   ```

2. The application will start and execute the `main.py` script located in the `project` directory.

## Configuration

- The `requirements.txt` file specifies the Python dependencies for the project.
- If environment variables are required, uncomment and configure the `env_file` section in the `docker-compose.yml` file.

## Networking

- The application is connected to the `app_network` network defined in the `docker-compose.yml` file.

For further details, refer to the provided Dockerfile and Docker Compose configuration.