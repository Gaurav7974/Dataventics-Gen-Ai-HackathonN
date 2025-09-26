let recognition = null;
let onResultCb = null;

export function setOnResult(cb) {
  onResultCb = cb;
}

export async function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) throw new Error('SpeechRecognition not supported');

  if (!recognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = true;
    recognition.continuous = false; // single utterance

    recognition.onresult = (ev) => {
      let interim = '';
      let final = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const r = ev.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      if (onResultCb) onResultCb({ interim, final });
    };

    recognition.onend = () => {
      // user stopped speaking
    };

    recognition.onerror = (e) => {
      console.error('recognition error', e);
    };
  }

  recognition.start();
}

export function stopListening() {
  if (recognition) {
    try { recognition.stop(); } catch (e) {}
  }
}

// TTS
let synth = window.speechSynthesis;

export function speak(text, { lang = 'en-IN' } = {}) {
  return new Promise((resolve) => {
    if (!synth) return resolve();
    stopSpeaking();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    const voices = synth.getVoices();
    const v = voices.find((x) => x.lang && x.lang.toLowerCase().includes('en-in')) || voices[0];
    if (v) utter.voice = v;
    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    synth.speak(utter);
  });
}

export function stopSpeaking() {
  if (synth && synth.speaking) {
    try { synth.cancel(); } catch (e) {}
  }
}
