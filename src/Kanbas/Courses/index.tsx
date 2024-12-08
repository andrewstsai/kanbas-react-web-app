import CoursesNavigation from "./Navigation";
import { Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import * as coursesClient from "./client";
import { useEffect } from "react";
import { useState } from "react";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import TakeQuiz from "./Quizzes/Attempts/TakeQuiz";
import DetailsEditor from "./Quizzes/DetailsEditor";
import QuestionsEditor from "./Quizzes/Questions/QuestionsEditor";
import Questions from "./Quizzes/Questions";
import ViewQuiz from "./Quizzes/Attempts/ViewQuiz";
export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === cid);
  const [users, setUsers] = useState<any[]>([]);

  const fetchPeople = async () => {
    if (course) {
      try {
        const fetchedUsers = await coursesClient.findUsersForCourse(course._id);
        console.log(users);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable users={users} />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/Details/:qid" element={<QuizDetails />} />
            <Route
              path="Quizzes/DetailsEditor/:qid"
              element={<DetailsEditor />}
            />
            <Route path="Quizzes/Questions/:qid" element={<Questions />} />
            <Route path="Quizzes/TakeQuiz/:qid" element={<TakeQuiz />} />
            <Route path="Quizzes/ViewQuiz/:qid" element={<ViewQuiz />} />
            <Route
              path="Quizzes/Questions/:qid/:quesid"
              element={<QuestionsEditor />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
