import React from 'react';
import './App.css';
import UploadImage from './components/UploadImage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Handwritten Text Recognition</h1>
        <UploadImage />
      </header>
    </div>
  );
}

export default App;
