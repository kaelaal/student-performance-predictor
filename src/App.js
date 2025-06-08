import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    Gender: 'Female',
    Study_Hours_per_Week: '',
    Attendance_Rate: '',
    Past_Exam_Scores: '',
    Internet_Access_at_Home: 'Yes',
    Extracurricular_Activities: 'No',
    Final_Exam_Score: ''
  });

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseData(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/gradestudent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Gender: formData.Gender,
          Study_Hours_per_Week: parseFloat(formData.Study_Hours_per_Week),
          Attendance_Rate: parseFloat(formData.Attendance_Rate),
          Past_Exam_Scores: parseFloat(formData.Past_Exam_Scores),
          Internet_Access_at_Home: formData.Internet_Access_at_Home,
          Extracurricular_Activities: formData.Extracurricular_Activities,
          Final_Exam_Score: parseFloat(formData.Final_Exam_Score)
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong while contacting the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🎓 Student Performance Predictor</h1>

      <form onSubmit={handleSubmit}>
        <h3>👤 Personal Info</h3>
        <label>
          Gender:
          <select name="Gender" value={formData.Gender} onChange={handleChange}>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </label>

        <h3>📚 Academic Details</h3>
        <label>
          Study Hours per Week:
          <input
            type="number"
            name="Study_Hours_per_Week"
            value={formData.Study_Hours_per_Week}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Attendance Rate (%):
          <input
            type="number"
            name="Attendance_Rate"
            value={formData.Attendance_Rate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Past Exam Scores:
          <input
            type="number"
            name="Past_Exam_Scores"
            value={formData.Past_Exam_Scores}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Final Exam Score:
          <input
            type="number"
            name="Final_Exam_Score"
            value={formData.Final_Exam_Score}
            onChange={handleChange}
            required
          />
        </label>

        <h3>🏡 Environment</h3>
        <label>
          Internet Access at Home:
          <select name="Internet_Access_at_Home" value={formData.Internet_Access_at_Home} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Extracurricular Activities:
          <select name="Extracurricular_Activities" value={formData.Extracurricular_Activities} onChange={handleChange}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </label>

        <button type="submit">🚀 Predict Outcome</button>
      </form>

      {loading && <p className="loading">Predicting... ⏳</p>}
      {error && <p className="error">{error}</p>}

      {responseData && (
        <div className="result">
          <h2>📊 Prediction Result</h2>
          <p><strong>Student will:</strong> {responseData.Prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;
