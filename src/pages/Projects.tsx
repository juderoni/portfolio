import { useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../types';
import './Projects.css';

const Projects = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe header and grid
    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, []);

  const renderProjectCard = (project: Project, index: number) => (
    <div key={project.id} className={`project-card hover-lift animate-fade-in-up animate-stagger-${Math.min(index + 1, 6)}`}>
      <div className="project-header">
        <h3 className="project-title">{project.title}</h3>
        <span className="project-period">{project.period}</span>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-technologies">
        {project.technologies.map((tech) => (
          <span key={tech} className="tech-tag hover-scale">
            {tech}
          </span>
        ))}
      </div>

      {project.links && (
        <div className="project-links">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link demo-link hover-glow"
            >
              <svg
                className="link-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-2 0V5H5v10h4a1 1 0 110 2H4a1 1 0 01-1-1V4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M15 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L15.586 7H15z"
                  clipRule="evenodd"
                />
              </svg>
              Live Demo
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link repo-link hover-lift"
            >
              <svg
                className="link-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              Repository
            </a>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="projects-page">
      <div className="projects-container">
        <div ref={headerRef} className="projects-header animate-on-scroll">
          <h1 className="animate-fade-in-up">Projects</h1>
          <p className="animate-fade-in-up animate-stagger-1">
            A showcase of my technical work and accomplishments, featuring web
            applications, mobile apps, and full-stack development projects.
          </p>
        </div>

        <div ref={gridRef} className="projects-grid animate-on-scroll">{projects.map(renderProjectCard)}</div>
      </div>
    </div>
  );
};

export default Projects;
