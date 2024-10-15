// App.js
import React from 'react';
import MarkdownRenderer from './components/MarkdownRenderer';

const filePath = "./src/Docs/example.md";

const App = () => {
  const ENV = { 
    MDENV_TITLE: 'Hello World',
    MDENV_DESCRIPTION: 'This is a description.',
    MDENV_CODE_BLOCK: `{
      "example": "This is an example code block."
    }`,
    MDENV_JSON_SCHEMA: `{
      "date": ${new Date}
    }`
  };

  return (
    <div>
      <h1>Markdown Example</h1>
      <MarkdownRenderer filePath={filePath} MDENV={ENV} />
    </div>
  );
};

export default App;
