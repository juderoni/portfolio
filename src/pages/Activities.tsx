import { useEffect, useRef } from 'react';
import { activities } from '../data';
import type { Activity } from '../types';
import './Activities.css';

const Activities = () => {
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

  const renderActivityCard = (activity: Activity, index: number) => (
    <div key={activity.id} className={`activity-card hover-lift animate-fade-in-up animate-stagger-${Math.min(index + 1, 6)}`}>
      <div className="activity-header">
        <div className="activity-title-section">
          <h3 className="activity-title">{activity.title}</h3>
          <p className="activity-organization">{activity.organization}</p>
        </div>
        <span className="activity-period">{activity.period}</span>
      </div>

      <p className="activity-description">{activity.description}</p>

      <div className="activity-achievements">
        <h4 className="achievements-title">Key Achievements & Impact</h4>
        <ul className="achievements-list">
          {activity.achievements.map((achievement, idx) => (
            <li key={idx} className="achievement-item hover-scale">
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="activities-page">
      <div className="activities-container">
        <div ref={headerRef} className="activities-header animate-on-scroll">
          <h1 className="animate-fade-in-up">Activities & Leadership</h1>
          <p className="animate-fade-in-up animate-stagger-1">
            Showcasing leadership roles, extracurricular involvement, and
            community engagement that demonstrate commitment to personal growth
            and making a positive impact.
          </p>
        </div>

        <div ref={gridRef} className="activities-grid animate-on-scroll">
          {activities.map(renderActivityCard)}
        </div>
      </div>
    </div>
  );
};

export default Activities;
