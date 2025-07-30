#!/bin/bash

# Docker build and test script for portfolio website

echo "🐳 Testing Docker configuration for portfolio website..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker daemon is not running. Please start Docker and try again."
    echo "   On macOS: Start Docker Desktop"
    echo "   On Linux: sudo systemctl start docker"
    exit 1
fi

echo "✅ Docker daemon is running"

# Build the Docker image
echo "🔨 Building Docker image..."
if docker build -t portfolio-website .; then
    echo "✅ Docker image built successfully"
else
    echo "❌ Docker build failed"
    exit 1
fi

# Run the container
echo "🚀 Starting container on port 8080..."
CONTAINER_ID=$(docker run -d -p 8080:8080 --name portfolio-test portfolio-website)

if [ $? -eq 0 ]; then
    echo "✅ Container started successfully (ID: $CONTAINER_ID)"
    
    # Wait a moment for the container to start
    sleep 3
    
    # Test the health endpoint
    echo "🏥 Testing health endpoint..."
    if curl -f http://localhost:8080/health > /dev/null 2>&1; then
        echo "✅ Health check passed"
    else
        echo "⚠️  Health check failed (container might still be starting)"
    fi
    
    # Test the main page
    echo "🌐 Testing main page..."
    if curl -f http://localhost:8080/ > /dev/null 2>&1; then
        echo "✅ Main page accessible"
        echo "🎉 Docker configuration test completed successfully!"
        echo "   Visit http://localhost:8080 to view the website"
    else
        echo "❌ Main page not accessible"
    fi
    
    # Cleanup
    echo "🧹 Cleaning up test container..."
    docker stop portfolio-test > /dev/null 2>&1
    docker rm portfolio-test > /dev/null 2>&1
    
else
    echo "❌ Failed to start container"
    exit 1
fi