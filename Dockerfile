# Use an official Nginx image
FROM nginx:latest

# Copy the HTML file and resume to the Nginx directory
COPY index.html /usr/share/nginx/html/index.html
COPY resume.pdf /usr/share/nginx/html/resume.pdf

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Override the default command to ensure Nginx runs on port 8080
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]
