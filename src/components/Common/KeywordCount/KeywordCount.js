import React from 'react';
import './KeywordCount.scss';

const KeywordCount = ({ highest, word, count }) => {
  let height = (count / highest) * 100;
  return (
    <div className="progress-container">
      <div className="progress">
        <div className="word keyword">{word}</div>
        <div className="word count">{`x${count} Times`}</div>
        <div style={{ height: `${height}%` }} className="progress-bar"></div>
      </div>
    </div>
  );
};

export default KeywordCount;
