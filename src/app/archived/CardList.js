import React from 'react';
import Card from './Card';

const CardList = ({ cards }) => {
  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <Card
          key={index}
          header={card.header}
          subtext={card.subtext}
          link={card.link}
          linkText={card.linkText}
        />
      ))}
    </div>
  );
};

export default CardList;
