import React, { useEffect, useRef, useState } from 'react';
import MicButton from './components/MicButton';
import Transcript from './components/Transcript';
import CourseCard from './components/CourseCard';
import CourseDetailModal from './components/CourseDetailModal';
import * as api from './lib/api';
import { startListening, stopListening, setOnResult, speak, stopSpeaking } from './lib/voice';

export default function App() {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [finalText, setFinalText] = useState('');
  const [matchedCourses, setMatchedCourses] = useState([]);
  const [popular, setPopular] = useState([]);
  const [detailCourseId, setDetailCourseId] = useState(null);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const transcriptRef = useRef(null);

  useEffect(() => {
    // Subscribe to STT results from lib/voice
    setOnResult(({ interim: i, final: f }) => {
      setInterim(i || '');
      if (f) {
        setFinalText((prev) => (prev ? prev + ' ' + f : f));
        setInterim('');
        handleSearch(f);
      }
    });

    // Load popular courses
    (async () => {
      const list = await api.fetchPopular();
      setPopular(list || []);
    })();

    // Cleanup when unmount
    return () => {
      try { stopListening(); } catch (e) {}
    };
  }, []);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [interim, finalText]);

  async function handleSearch(query) {
    if (!query.trim()) return;

    try {
      const res = await api.searchCourses(query);
      if (res && Array.isArray(res)) {
        setMatchedCourses(prev => [...res, ...prev]);
      } else {
        console.warn("No courses returned for:", query);
      }
    } catch (e) {
      console.error('Search API error:', e);
    }
  }

  const toggleListening = async () => {
    if (listening) {
      try { stopListening(); } catch (e) {}
      setListening(false);
      return;
    }

    // Interruption handling: if agent speaking, stop TTS first
    if (agentSpeaking) {
      try { stopSpeaking(); } catch (e) {}
      setAgentSpeaking(false);
      await api.postInterruption({ reason: 'user_interrupt' });
    }

    try {
      await startListening();
      setListening(true);
    } catch (e) {
      console.warn('start listening failed', e);
      setListening(false);
    }
  };

  async function simulateAgentReply(text) {
    if (!text) return;
    setAgentSpeaking(true);
    await speak(text, { lang: 'en-IN' });
    setAgentSpeaking(false);
  }

  const openCourseDetail = (courseId) => {
    setDetailCourseId(courseId);
  };

  return (
    <div className="rd-root">
      <div className="rd-center">
        <h1 className="heading">Gen AI Course Consultant</h1>
        <p className="sub">Ask about courses, syllabus, fees, duration and placement support</p>

        <div className="mic-area">
          <MicButton
            listening={listening}
            onToggle={toggleListening}
            ariaLabel={listening ? 'Stop listening' : 'Start listening'}
          />

          <div ref={transcriptRef} className="transcript-wrapper" aria-live="polite">
            <Transcript interim={interim} finalText={finalText} />
          </div>

          <div className="sim-controls">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const val = e.target.elements['simulate'].value;
                if (!val) return;
                setFinalText((p) => (p ? p + ' ' + val : val));
                handleSearch(val);
                simulateAgentReply('Here are some courses I found matching your query.');
                e.target.reset();
              }}
            >
              <input name="simulate" className="simulate-input" placeholder="Type to simulate speech (e.g. 'show full-stack data science')" />
              <button className="simulate-btn">Ask</button>
            </form>
          </div>
        </div>

        {matchedCourses.length > 0 && (
          <section className="matched">
            <h2>Matched courses</h2>
            <div className="course-grid">
              {matchedCourses.map((c) => (
                <CourseCard key={c.id} course={c} onView={() => openCourseDetail(c.id)} />
              ))}
            </div>
          </section>
        )}

        <section className="discover">
          <div className="discover-header">
            <h2>Discover courses</h2>
            <input placeholder="Search courses, skills, keywords" className="search-input" />
          </div>

          <div className="course-grid">
            {popular.length > 0
              ? popular.map((c) => <CourseCard key={c.id} course={c} onView={() => openCourseDetail(c.id)} />)
              : [
                  { id: 's1', title: 'Full-Stack Data Science', platform: 'Curata Labs', duration: '6 months', fee: '₹45,000', notes: 'End-to-end ML + production engineering' },
                  { id: 's2', title: 'Machine Learning Engineer', platform: 'Udemy', duration: '4 months', fee: '₹12,000', notes: 'Model building and deployment' },
                ].map((c) => <CourseCard key={c.id} course={c} onView={() => openCourseDetail(c.id)} />)}
          </div>
        </section>
      </div>

      {detailCourseId && <CourseDetailModal courseId={detailCourseId} onClose={() => setDetailCourseId(null)} />}
    </div>
  );
}