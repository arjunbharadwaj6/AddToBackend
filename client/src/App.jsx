import Sidebar from "./components/Sidebar.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx"
import CreateQuizzes from "./components/create/CreateQuizzes.jsx";
import CreateQuestions from "./components/create/CreateQuestions.jsx";
import UpdateQuestions from "./components/update/UpdateQuestions.jsx";
import UpdateQuizzes from "./components/update/UpdateQuizzes.jsx";

const App = () => {
  return (
    <>
        <Router>
            <div className="App">
                <Sidebar />
                <div className="info">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create/quizzes" element={<CreateQuizzes />} />
                        <Route path="/create/questions" element={<CreateQuestions />} />
                        <Route path="/update/quizzes" element={<UpdateQuizzes />} />
                        <Route path="/update/questions" element={<UpdateQuestions />} />
                    </Routes>
                </div>
            </div>
        </Router>
    </>
  );
};

export default App;
