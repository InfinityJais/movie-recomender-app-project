# Use an official Python runtime as a parent image
# We choose a slim version to keep the image size small
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy all project files into the container's working directory
COPY . .

# Install any needed packages specified in requirements.txt
# We upgrade pip and install requirements in a single command for efficiency
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Expose the port on which the FastAPI application will run
EXPOSE 8000

# Define the command to run the application using Uvicorn
# The command assumes app.py is in the current working directory ('/app')
# The '--host 0.0.0.0' makes the server accessible from outside the container
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
