import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useState, useEffect } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as enrollmentClient from "./Enrollments/client";
import { useSelector } from "react-redux";
export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [allEnrollments, setAllEnrollments] = useState(false);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const findAllCourses = async () => {
    try {
      const courseList = await courseClient.fetchAllCourses();
      setAllCourses(courseList);
    } catch (error) {
      console.error(error);
    }
  };
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };
  const findMyCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  const findAllEnrollments = async () => {
    try {
      const enrollments = await userClient.findMyEnrollments();
      setEnrollments(enrollments);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    findMyCourses();
    findAllCourses();
    findAllEnrollments();
  }, [currentUser]);

  const addEnrollment = async (user: any, course: any) => {
    const newEnrollments = await enrollmentClient.enrollInCourse(user, course);
    setEnrollments(newEnrollments);
  };

  const removeEnrollment = async (user: any, course: any) => {
    const enrollmentId = enrollments.find(
      (enrollment) => enrollment.course === course && enrollment.user === user
    )._id;
    const newEnrollments = await enrollmentClient.unenrollFromCourse(
      enrollmentId
    );
    setEnrollments(enrollments.filter((enrollment) => enrollment._id !== enrollmentId));
  };

  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    allCourses={allCourses}
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrollments={enrollments}
                    allEnrollments={allEnrollments}
                    setAllEnrollments={setAllEnrollments}
                    addEnrollment={addEnrollment}
                    removeEnrollment={removeEnrollment}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
