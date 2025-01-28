# Use an official Nginx image
FROM nginx:latest

# Copy the HTML file and resume
COPY index.html /usr/share/nginx/html/index.html
COPY resume.pdf /usr/share/nginx/html/resume.pdf

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Override Nginx to listen on port 8080
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf", "-p", "8080"]
