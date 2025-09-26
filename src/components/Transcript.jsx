import React from 'react';

export default function Transcript({ interim, finalText }) {
  return (
    <div className="transcript-white">
      <div className="transcript-lines">
        {finalText ? <div className="final-text">{finalText}</div> : null}
        {interim ? <div className="interim-text">{interim}</div> : null}
        {!finalText && !interim && <div className="placeholder">Your speech will appear here</div>}
      </div>
    </div>
  );
}
