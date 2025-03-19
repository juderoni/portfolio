#!/bin/bash

# Check if docker-compose-dev.yml exists
if [ ! -f docker-compose-dev.yml ]; then
  echo "Error: docker-compose-dev.yml not found!"
  exit 1
fi

# Run docker-compose up with the specified file
docker-compose -f docker-compose-dev.yml up
