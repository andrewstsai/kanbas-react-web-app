import { BsGripVertical } from "react-icons/bs";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { MdArrowDropDown } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentControls from "./AssignmentControls";

export default function Assignments() {
  return (
    <div>
      <AssignmentControls />
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary fs-4">
            <BsGripVertical className="me-2 fs-3" />
            <MdArrowDropDown className="me-1"/>
            ASSIGNMENTS
            <AssignmentsControlButtons />
          </div>
          <ul
            id="wd-assignment-list"
            className="wd-module list-group rounded-0"
          >
            <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <GoChecklist className="text-success me-2" />
              <div>
                <a
                  className="wd-assignment-link fw-bold"
                  href="#/Kanbas/Courses/1234/Assignments/123"
                >
                  A1 - ENV + HTML
                </a>
                <div>
                  Multiple Modules | Not available until May 6 at 12:00am | Due
                  May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-auto">
                <AssignmentControlButtons />
              </div>
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <GoChecklist className="text-success me-2" />
              <div>
                <a
                  className="wd-assignment-link fw-bold"
                  href="#/Kanbas/Courses/1234/Assignments/124"
                >
                  A2 - CSS + BOOTSTRAP
                </a>
                <div>
                  Multiple Modules | Not available until May 13 at 12:00am | Due
                  May 20 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-auto">
                <AssignmentControlButtons />
              </div>
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <GoChecklist className="text-success me-2" />
              <div>
                <a
                  className="wd-assignment-link fw-bold"
                  href="#/Kanbas/Courses/1234/Assignments/124"
                >
                  A3 - JAVASCRIPT + REACT
                </a>
                <div>
                  Multiple Modules | Not available until May 20 at 12:00am | Due
                  May 27 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-auto">
                <AssignmentControlButtons />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
