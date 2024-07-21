import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import EditQuizzes from "./EditQuizzes.jsx"
import "./update.css"

const UpdateQuizzes = () => {
    const [data, setData] = useState([]);
    const [editQuiz, setEditQuiz] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/quizzes");
                setData(response.data);
            } catch (err) {
                console.log("Error while getting data:", err);
            }
        };

        getData();
    }, []);

    const deleteQuiz = async (id, quizId) => {
        try {
            await axios.delete(`http://localhost:5000/quizzes/${quizId}/${id}`);
            setData(data.filter(question => question._id !== id));
        } catch (err) {
            console.log('Error while deleting question:', err);
        }
    };

    const handleUpdate = async () => {
        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/quizzes");
                setData(response.data);
            } catch (err) {
                console.log("Error while getting data:", err);
            }
        };

        getData();
        setEditQuiz(null); // Close the edit form
    };

    return (
        <div className="container">
            {editQuiz ? (
                <EditQuizzes quiz={editQuiz} onUpdate={handleUpdate} onCancel={() => setEditQuiz(null)}/>
            ) :
            <table className="table table-striped table-bordered text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Quiz Name</th>
                    <th scope="col">Quiz ID</th>
                    <th scope="col" style={{width: "10%"}}>Edit</th>
                    <th scope="col" style={{width: "10%"}}>Delete</th>
                </tr>
                </thead>
                <tbody>
                {data.map((quiz) => (
                    <tr key={quiz._id}>
                        <td className="align-middle">{quiz.heading}</td>
                        <td className="align-middle">{quiz.quizId}</td>
                        <td><FontAwesomeIcon className="icon" icon={faPen} onClick={() => setEditQuiz(quiz)}/></td>
                        <td><FontAwesomeIcon className="icon" icon={faTrashCan} onClick={() => deleteQuiz(quiz._id, quiz.quizId)} /></td>
                    </tr>
                ))}
                </tbody>
            </table>
            }
        </div>
    );
}

export default UpdateQuizzes;
