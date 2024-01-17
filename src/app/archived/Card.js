import React from 'react';
import './Card.css';

const Card = ({ header, subtext, link }) => {
    return (
      <div className="card">
        <div className="card-header"></div>
        <div className="card-title">{header}</div>
        <div className="card-content">{subtext}</div>
        <a href={link} className="card-link">Go →</a>
      </div>
    );
  };

export default Card;