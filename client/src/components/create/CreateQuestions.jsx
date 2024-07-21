import { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "../Data.css";

const CreateQuestions = () => {
  const initialFormState = {
    question: null,
    options: [null, null, null, null],
    answer: null,
    quizId: null,
    imageSource: null,
  };

  const [showModal, setShowModal] = useState(false);
  const [correctData, setCorrectData] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

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
    let isValid = true;
    for (let key in formData) {
      if (formData[key] === null) {
        console.log(formData[key], key);
        isValid = false;
        break;
      }
    }
    setCorrectData(isValid);
    setShowModal(true);
    console.log(correctData);
    if (correctData) {
      try {
        const response = await axios.post(
          "http://localhost:5000/questions/submit",
          formData
        );
        if (response.data && response.data.message) {
          setCorrectData(true);
          setShowModal(true);
        } else {
          setCorrectData(false);
          setShowModal(true);
        }
      } catch (error) {
        console.error("Error adding data:", error);
        setCorrectData(false);
        setShowModal(true);
      }
    }
    setFormData(initialFormState);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="question">
            <p>Question</p>
            <input
              name="question"
              value={formData.question}
              onChange={handleChange}
              type="text"
            />
          </div>
          {formData.options.map((option, index) => (
            <div className="options" key={index}>
              <p>Option {index + 1}</p>
              <input
                name={`option-${index + 1}`}
                value={option}
                onChange={handleChange}
                type="text"
              />
            </div>
          ))}
          <div className="answer">
            <p>Answer</p>
            <input
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="quizId">
            <p>Quiz ID</p>
            <input
              name="quizId"
              value={formData.quizId}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="image-source">
            <p>Image Source</p>
            <input
              name="imageSource"
              value={formData.imageSource}
              onChange={handleChange}
              type="text"
            />
          </div>
          <button type="submit" className="data-btn">
            Add Data
          </button>
        </form>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form Submission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {correctData
              ? "Data has been added successfully!"
              : "There is an error while adding data."}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CreateQuestions;
