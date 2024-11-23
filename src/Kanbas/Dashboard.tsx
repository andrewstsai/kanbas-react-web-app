import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as userClient from "./Account/client";
export default function Dashboard({
  allCourses,
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrollments,
  allEnrollments,
  setAllEnrollments,
  addEnrollment,
  removeEnrollment,
}: {
  allCourses: any[];
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrollments: any[];
  allEnrollments: boolean;
  setAllEnrollments: (flag: boolean) => void;
  addEnrollment: (user: any, course: any) => void;
  removeEnrollment: (user: any, course: any) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courseList, setCourseList] = useState(courses);
  const [enrollmentList, setEnrollmentList] = useState(enrollments);
  const handleEnrollments = () => {
    setAllEnrollments(!allEnrollments);
  };
  const findMyCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourseList(courses);
    } catch (error) {
      console.error(error);
    }
  };
  const findMyEnrollments = async () => {
    try {
      const enrollments = await userClient.findMyEnrollments();
      setEnrollmentList(enrollments);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    findMyCourses();
    findMyEnrollments();
  }, [enrollments, courses]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "STUDENT" && (
        <h5>
          <button
            className="btn btn-primary float-end"
            id="wd-enrollments"
            onClick={handleEnrollments}
          >
            Enrollments
          </button>
        </h5>
      )}
      {currentUser.role === "FACULTY" && (
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            {" "}
            Add{" "}
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
      )}
      <br />
      {currentUser.role === "FACULTY" && (
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
      )}
      {currentUser.role === "FACULTY" && (
        <textarea
          value={course.description}
          className="form-control"
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
      )}
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {!allEnrollments &&
            courseList.map((course) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img src="/images/reactjs.jpg" width="100%" height={160} />
                    <div className="card-body">
                      <h5
                        className="wd-dashboard-course-title card-title"
                        style={{ height: 80 }}
                      >
                        {course.name}{" "}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}{" "}
                      </p>
                      {currentUser.role === "FACULTY" && (
                        <button className="btn btn-primary"> Go </button>
                      )}

                      {currentUser.role === "FACULTY" && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      )}
                      {currentUser.role === "FACULTY" && (
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          {allEnrollments &&
            courseList.map((course) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img src="/images/reactjs.jpg" width="100%" height={160} />
                    <div className="card-body">
                      <h5
                        className="wd-dashboard-course-title card-title"
                        style={{ height: 80 }}
                      >
                        {course.name}{" "}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}{" "}
                      </p>

                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          removeEnrollment(currentUser._id, course._id);
                        }}
                        className="btn btn-danger float-end"
                      >
                        Unenroll
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          {allEnrollments &&
            allCourses
              .filter(
                (course) =>
                  !enrollmentList.some(
                    (enrollment) =>
                      enrollment.user === currentUser._id &&
                      enrollment.course === course._id
                  )
              )
              .map((course) => (
                <div
                  className="wd-dashboard-course col"
                  style={{ width: "300px" }}
                >
                  <div className="card rounded-3 overflow-hidden">
                    <img src="/images/reactjs.jpg" width="100%" height={160} />
                    <div className="card-body">
                      <h5
                        className="wd-dashboard-course-title card-title"
                        style={{ height: 80 }}
                      >
                        {course.name}{" "}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}{" "}
                      </p>

                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          addEnrollment(currentUser._id, course._id);
                        }}
                        className="btn btn-primary"
                      >
                        {" "}
                        Enroll{" "}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
