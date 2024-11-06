import { BsGripVertical } from "react-icons/bs";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { MdArrowDropDown } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentControls from "./AssignmentControls";
import { Route, Routes, useParams } from "react-router";
import * as db from "../../Database";
import { deleteAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  return (
    <div>
      {currentUser.role === "FACULTY" && <AssignmentControls />}
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary fs-4">
            <BsGripVertical className="me-2 fs-3" />
            <MdArrowDropDown className="me-1" />
            ASSIGNMENTS
            <AssignmentsControlButtons />
          </div>
          <ul
            id="wd-assignment-list"
            className="wd-module list-group rounded-0"
          >
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-2" />
                  <GoChecklist className="text-success me-2 fs-2" />
                  <div>
                    <a
                      className="wd-assignment-link fw-bold"
                      href={`#/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </a>
                    <div>
                      Multiple Modules | Not available until May 6 at 12:00am |
                      Due May 13 at 11:59pm | 100 pts
                    </div>
                  </div>
                  {currentUser.role === "FACULTY" && (
                    <div className="ms-auto">
                      <AssignmentControlButtons
                        assignmentId={assignment._id}
                        deleteAssignment={(assignmentId) => {
                          dispatch(deleteAssignment(assignmentId));
                        }}
                      />
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
