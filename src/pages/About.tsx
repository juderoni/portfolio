import { useEffect, useRef } from 'react';
import { personalInfo, education, experience, skills } from '../data';
import './About.css';

const About = () => {
  const heroRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

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

    // Observe all sections
    const sections = [heroRef.current, educationRef.current, experienceRef.current, skillsRef.current];
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section animate-on-scroll">
        <div className="hero-content">
          <h1 className="hero-name animate-fade-in-up">{personalInfo.name}</h1>
          <h2 className="hero-title animate-fade-in-up animate-stagger-1">{personalInfo.title}</h2>
          <p className="hero-summary animate-fade-in-up animate-stagger-2">{personalInfo.summary}</p>

          <div className="contact-info animate-fade-in-up animate-stagger-3">
            <a href={`mailto:${personalInfo.email}`} className="contact-item hover-lift">
              <span className="contact-icon">✉</span>
              {personalInfo.email}
            </a>
            <a href={`tel:${personalInfo.phone}`} className="contact-item hover-lift">
              <span className="contact-icon">📞</span>
              {personalInfo.phone}
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item hover-lift"
            >
              <span className="contact-icon">💼</span>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section ref={educationRef} className="education-section animate-on-scroll">
        <div className="section-container">
          <h2 className="section-title animate-fade-in-up">Education</h2>
          <div className="timeline">
            {education.map((edu, index) => (
              <div key={index} className={`timeline-item animate-fade-in-left animate-stagger-${index + 1}`}>
                <div className="timeline-marker"></div>
                <div className="timeline-content hover-lift">
                  <div className="timeline-header">
                    <h3 className="timeline-title">
                      {edu.degree} in {edu.field}
                    </h3>
                    <span className="timeline-date">{edu.graduationDate}</span>
                  </div>
                  <p className="timeline-institution">{edu.institution}</p>
                  <p className="timeline-gpa">GPA: {edu.gpa}</p>
                  <ul className="timeline-achievements">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="experience-section animate-on-scroll">
        <div className="section-container">
          <h2 className="section-title animate-fade-in-up">Experience</h2>
          <div className="timeline">
            {experience.map((exp, index) => (
              <div key={index} className={`timeline-item animate-fade-in-right animate-stagger-${index + 1}`}>
                <div className="timeline-marker"></div>
                <div className="timeline-content hover-lift">
                  <div className="timeline-header">
                    <h3 className="timeline-title">{exp.position}</h3>
                    <span className="timeline-date">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="timeline-company">
                    {exp.company} • {exp.location}
                  </p>
                  <p className="timeline-description">{exp.description}</p>
                  <ul className="timeline-achievements">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="skills-section animate-on-scroll">
        <div className="section-container">
          <h2 className="section-title animate-fade-in-up">Skills</h2>
          <div className="skills-grid">
            {skills.map((category, index) => (
              <div key={index} className={`skill-category animate-scale-in animate-stagger-${index + 1} hover-lift`}>
                <h3 className="skill-category-title">{category.category}</h3>
                <div className="skill-tags">
                  {category.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag hover-scale">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
