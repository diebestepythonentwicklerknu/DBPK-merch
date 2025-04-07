# Running the Project with Docker

This section provides instructions for setting up and running the project using Docker.

## Prerequisites

- Ensure Docker and Docker Compose are installed on your system.
- Python version 3.10 is used in the Dockerfile.

## Build and Run Instructions

1. Build the Docker image and start the services:

   ```bash
   docker-compose up --build
   ```

2. The application will start and execute the `manage.py` script located in the root directory.

## Configuration

- The `requirements.txt` file specifies the Python dependencies for the project.
- If environment variables are required, uncomment and configure the `env_file` section in the `docker-compose.yml`
  file.

## Networking

- The application is connected to the `app_network` network defined in the `docker-compose.yml` file.

For further details, refer to the provided Dockerfile and Docker Compose configuration.

## Postman

- https://.postman.co/workspace/My-Workspace~4a107b40-1e5e-4033-85ff-ad9e22a46327/collection/24391435-e3bcfb23-4e48-4d3d-9b4e-c1d2d0d63cd4?action=share&creator=24391435