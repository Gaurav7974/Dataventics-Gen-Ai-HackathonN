export async function fetchPopular() {
  try {
    const res = await fetch('/api/popular');
    const data = await res.json();
    return data.courses || [];
  } catch (e) {
    return [];
  }
}

export async function searchCourses(q) {
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    return data.courses || [];
  } catch (e) {
    return [];
  }
}

export async function getCourse(id) {
  try {
    const res = await fetch(`/api/course/${encodeURIComponent(id)}`);
    const data = await res.json();
    return data.course || null;
  } catch (e) {
    return null;
  }
}

export async function postInterruption(payload) {
  try {
    await fetch('/api/voice/interruption', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch (e) {
    // ignore
  }
}