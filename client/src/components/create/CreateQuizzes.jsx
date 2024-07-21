import { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "../Data.css";

const CreateQuizzes = () => {
  const initialFormState = {
    imageSource: null,
    heading: null,
    description: null,
    grade: null,
    quizId: null,
    price: null,
    category: null,
  };

  const [showModal, setShowModal] = useState(false);
  const [correctData, setCorrectData] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    for (let key in formData) {
      console.log(formData[key]);
      if (formData[key] === null) {
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
          "http://localhost:5000/quizzes/submit",
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
      setFormData(initialFormState);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="image-source">
            <p>Image Source</p>
            <input
              name="imageSource"
              value={formData.imageSource}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="heading">
            <p>Heading</p>
            <input
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="description">
            <p>Description</p>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="grade">
            <p>Grade</p>
            <input
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="quizId">
            <p>Quiz Id</p>
            <input
              name="quizId"
              value={formData.quizId}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="Price">
            <p>Price</p>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="category">
            <p>Category</p>
            <input
              name="category"
              value={formData.category}
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

export default CreateQuizzes;
