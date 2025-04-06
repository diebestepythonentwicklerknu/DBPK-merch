# syntax=docker/dockerfile:1

# Use a slim Python base image
FROM python:3.9-slim AS base

# Set working directory
WORKDIR /app

# Builder stage for installing dependencies
FROM base AS builder

# Copy requirements file
COPY --link requirements.txt ./

# Install dependencies in a virtual environment
RUN --mount=type=cache,target=/root/.cache/pip \
    python -m venv .venv && \
    .venv/bin/pip install --no-cache-dir -r requirements.txt

# Final stage for the application
FROM base AS final

# Copy the virtual environment from the builder stage
COPY --from=builder /app/.venv /app/.venv

# Set the PATH to include the virtual environment's bin directory
ENV PATH="/app/.venv/bin:$PATH"

# Copy the application code
COPY --link project/ ./project

# Expose port 8000 to the outside world
EXPOSE 8000

# Set the default command to run the application
CMD ["python", "project/main.py"]