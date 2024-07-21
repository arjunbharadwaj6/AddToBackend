import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./update.css"
import EditQuestions from "./EditQuestions.jsx";

const UpdateQuestions = () => {
    const [data, setData] = useState([]);
    const [editQuestion, setEditQuestion] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/questions");
                setData(response.data);
            } catch (err) {
                console.log("Error while getting data:", err);
            }
        };

        getData();
    }, []);

    const deleteQuestion = async (id, quizId) => {
        try {
            await axios.delete(`http://localhost:5000/questions/${quizId}/${id}`);
            setData(data.filter(question => question._id !== id));
        } catch (err) {
            console.log('Error while deleting question:', err);
        }
    };

    const handleUpdate = async () => {
        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/questions");
                setData(response.data);
            } catch (err) {
                console.log("Error while getting data:", err);
            }
        };

        getData();
        setEditQuestion(null); // Close the edit form
    };

    return (
        <div className="container">
            {editQuestion ? (
                    <EditQuestions question={editQuestion} onUpdate={handleUpdate} onCancel={() => setEditQuestion(null)}/>
                ) :
            <table className="table table-striped table-bordered text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Question</th>
                    <th scope="col">Quiz ID</th>
                    <th scope="col" style={{width: "10%"}}>Edit</th>
                    <th scope="col" style={{width: "10%"}}>Delete</th>
                </tr>
                </thead>
                <tbody>
                {data.map((question) => (
                    <tr key={question._id}>
                        <td className="align-middle">{question.question}</td>
                        <td className="align-middle">{question.quizId}</td>
                        <td><FontAwesomeIcon className="icon" icon={faPenToSquare} onClick={() => setEditQuestion(question)}/></td>
                        <td><FontAwesomeIcon className="icon" icon={faTrash} onClick={() => deleteQuestion(question._id, question.quizId)} /></td>
                    </tr>
                ))}
                </tbody>
            </table>
            }
        </div>
    );
}

export default UpdateQuestions;
