# Use an official Nginx image
FROM nginx:latest

# Copy the HTML file to the Nginx web directory
COPY index.html /usr/share/nginx/html/index.html
COPY resume.pdf /usr/share/nginx/html/resume.pdf
