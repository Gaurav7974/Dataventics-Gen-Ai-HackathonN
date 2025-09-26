import React, { useState } from 'react';

export default function CourseCard({ course, onView }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="course-card" aria-labelledby={`course-${course.id}-title`}>
      <div className="course-header">
        <div>
          <h3 id={`course-${course.id}-title`} className="course-title">{course.title}</h3>
          <div className="course-meta">{course.platform} • {course.duration}</div>
        </div>

        <div className="course-side">
          <div className="course-fee">{course.fee}</div>
          <div className="course-actions">
            <button onClick={() => setExpanded((s) => !s)} className="btn-small">{expanded ? 'Hide' : 'Syllabus'}</button>
            <button onClick={onView} className="btn-primary">View</button>
          </div>
        </div>
      </div>

      <p className="course-description">{course.notes}</p>

      {expanded && (
        <div className="expanded-syllabus">
          <h4>Syllabus (summary)</h4>
          <p>This is a short preview of the syllabus. For full syllabus click View.</p>
        </div>
      )}

      <div className="course-footer">
        <button className="btn-ghost">Placement</button>
        <button className="btn-ghost">Apply</button>
      </div>
    </article>
  );
}
