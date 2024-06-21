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
      const response = await axios.post("https://9445-35-201-130-77.ngrok-free.app/predict", formData, {
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
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {imagePreview && <img src={imagePreview} alt="Uploaded Preview" style={{ maxWidth: '300px', marginTop: '20px' }} />}
      <button onClick={handleSubmit} disabled={!selectedFile}>Show Results</button>
      {result && (
        <div className="result">
          <h3>Detected Text:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
