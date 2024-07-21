import { useState, useEffect } from "react";
import axios from "axios";

const EditQuizzes = ({ quiz, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    image: null,
    heading: null,
    description: null,
    grade: null,
    quizId: null,
    price: null,
    category: null,
  });

  useEffect(() => {
    if (quiz) {
      setFormData(quiz);
    }
  }, [quiz]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/quizzes/${quiz.quizId}/${quiz._id}`,
        formData
      );
      onUpdate();
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Image</label>
        <input
          type="text"
          className="form-control"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Heading</label>
        <input
          type="text"
          className="form-control"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Grade</label>
        <input
          type="text"
          className="form-control"
          name="grade"
          value={formData.grade}
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
        <label>Price</label>
        <input
          type="text"
          className="form-control"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          className="form-control"
          name="category"
          value={formData.category}
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

export default EditQuizzes;
