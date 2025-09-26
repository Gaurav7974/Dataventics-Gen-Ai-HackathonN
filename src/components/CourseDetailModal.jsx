import React, { useEffect, useState } from 'react';
import * as api from '../lib/api';

export default function CourseDetailModal({ courseId, onClose }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getCourse(courseId)
      .then((c) => {
        if (!mounted) return;
        setCourse(c);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [courseId]);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal-header">
          <h3>{loading ? 'Loading...' : course?.title}</h3>
          <button onClick={onClose} className="modal-close">Close</button>
        </header>

        <div className="modal-body">
          {loading && <p>Loading course details...</p>}
          {!loading && course && (
            <div>
              <p><strong>Platform:</strong> {course.platform}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Fees:</strong> {course.fee}</p>
              <h4>Syllabus</h4>
              <div className="syllabus-content">
                <pre style={{whiteSpace: 'pre-wrap'}}>{course.syllabus || course.notes || 'Syllabus not provided.'}</pre>
              </div>

              <h4>Placement Support</h4>
              <p>{course.placement || 'Placement details not provided.'}</p>

              <div className="modal-actions">
                <a href={course.url || '#'} target="_blank" rel="noreferrer" className="btn-primary">Go to course</a>
                <button className="btn-ghost">Request callback</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
