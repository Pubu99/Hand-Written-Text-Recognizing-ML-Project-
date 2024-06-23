import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post("https://9dbf-34-16-172-81.ngrok-free.app/predict", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data.result);
    } catch (error) {
      console.error('There was an error processing the image!', error);
    }
  };

  return (
    <div className="upload-container">
      <input type="file" onChange={handleFileChange} accept="image/*" className="file-input" />
      
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Uploaded Preview" className="preview-image" />
        </div>
      )}
      
      <button onClick={handleSubmit} disabled={!selectedFile} className="submit-button">
        Show Results
      </button>
      
      {result && (
        <div className="result-container">
          <h3 className="result-title">Detected Text:</h3>
          <p className="result-text">{result}</p>
        </div>
      )}
    </div>
  );
  
};

export default UploadImage;
