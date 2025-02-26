# Use a lightweight Python image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy only requirements to leverage Docker cache
COPY backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY backend /app

# Expose port 5000 for Flask API
EXPOSE 5000

# Start Flask server
CMD ["python", "app/main.py"]
