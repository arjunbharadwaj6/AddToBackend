import { useState, useEffect } from "react";
import axios from "axios";
import "./update.css";

const EditQuestions = ({ question, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    question: null,
    options: [null, null, null, null],
    answer: null,
    quizId: null,
    imageSource: null,
  });

  useEffect(() => {
    if (question) {
      setFormData(question);
    }
  }, [question]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("option")) {
      const index = parseInt(name.split("-")[1], 10) - 1;
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({
        ...formData,
        options: newOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/questions/${question.quizId}/${question._id}`,
        formData
      );
      onUpdate();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Question</label>
        <input
          type="text"
          className="form-control"
          name="question"
          value={formData.question}
          onChange={handleChange}
        />
      </div>
      {formData.options.map((option, index) => (
        <div className="form-group options" key={index}>
          <label>Option {index + 1}</label>
          <input
            className="form-control"
            name={`option-${index + 1}`}
            value={option}
            onChange={handleChange}
            type="text"
          />
        </div>
      ))}
      <div className="form-group">
        <label>Answer</label>
        <input
          type="text"
          className="form-control"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Quiz ID</label>
        <input
          type="text"
          className="form-control"
          name="quizId"
          value={formData.quizId}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Image Source</label>
        <input
          type="text"
          className="form-control"
          name="imageSource"
          value={formData.imageSource}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditQuestions;
