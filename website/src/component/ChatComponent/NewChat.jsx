import React from 'react';
import CardPrompt from '../Card/CardPrompt';
import { Grid, Stack } from '@mui/material';
const searchItems = [
  {
    title: 'JavaScript Frameworks Comparison',
    description: 'Compare popular JavaScript frameworks like React, Angular, and Vue.js.'
  },
  {
    title: 'Introduction to Node.js',
    description: 'Learn the basics of Node.js and how to build server-side applications with JavaScript.'
  },
  {
    title: 'Data Structures and Algorithms in JavaScript',
    description: 'Explore common data structures and algorithms implemented in JavaScript.'
  },
  {
    title: 'Responsive Web Design Techniques',
    description: 'Learn how to create responsive web designs using HTML, CSS, and media queries.'
  },
  {
    title: 'Introduction to SQL Databases',
    description: 'Get started with SQL databases, including basic queries and database design principles.'
  },
  {
    title: 'Cybersecurity Best Practices',
    description: 'Discover essential cybersecurity practices to protect your systems and data.'
  }
];


const NewChat = ({ handleAddPrompt }) => {
  const handlePrompt = (content) => {
    handleAddPrompt(content);
  };
  return (
    <div>
      <h1>New Chat</h1>
      <p>How can I help you today?</p>
      <Grid spacing={2} container>
        {searchItems.map((item, index) => (
          <CardPrompt
            key={index}
            title={item.title}
            content={item.description}
            handleClick={handlePrompt}
          />
        )
        )}
      </Grid>
    </div>
  );
};

export default NewChat;