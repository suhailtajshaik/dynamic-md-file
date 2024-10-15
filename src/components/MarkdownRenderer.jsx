import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

// Styled components
const MarkdownContainer = styled.div`
  font-family: Arial, sans-serif;
  line-height: 1.6;
  
  h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
  }

  p {
    font-size: 1.1em;
  }

  pre {
    background: #f4f4f4;
    padding: 1em;
    border-radius: 5px;
  }

  code {
    font-family: monospace;
    background: #eee;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
`;

const MarkdownRenderer = ({ filePath, MDENV }) => {
  const [markdownContent, setMarkdownContent] = useState('');

// Function to replace {{MDENV_*}} placeholders with MDENV values
  const replacePlaceholders = (content, env) => {
    let updatedContent = content;

    // Filter and replace only keys starting with MDENV_
    Object.keys(env).forEach((key) => {
      if (key.startsWith('MDENV_')) {
        const placeholder = `{{${key}}}`;  // Matching {{MDENV_KEY}}
        const regex = new RegExp(placeholder, 'g');
        updatedContent = updatedContent.replace(regex, env[key]);
      }
    });

    return updatedContent;
  };


  
  // Load markdown file and replace placeholders
  useEffect(() => {
    const loadMarkdownFile = async () => {
      try {
        const response = await fetch(filePath);
        const text = await response.text();
        const replacedText = replacePlaceholders(text, MDENV);
        setMarkdownContent(replacedText);
      } catch (error) {
        console.error('Error loading markdown file:', error);
      }
    };

    loadMarkdownFile();
  }, [filePath, MDENV]);

  return (
    <MarkdownContainer>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </MarkdownContainer>
  );
};

export default MarkdownRenderer;
