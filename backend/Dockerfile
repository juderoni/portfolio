# Use a lightweight Python image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy only requirements to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . /app

# Expose port 5000 for Flask API
EXPOSE 5000

ENV PYTHONPATH=/app/app

# Start Flask server
CMD ["gunicorn", "app.main:app", "--bind", "0.0.0.0:5000", "--workers", "3"]
