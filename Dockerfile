# Use an official Nginx image
FROM nginx:latest

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the HTML file and resume
COPY index.html /usr/share/nginx/html/index.html
COPY resume.pdf /usr/share/nginx/html/resume.pdf

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Run Nginx with the custom configuration
CMD ["nginx", "-g", "daemon off;"]
