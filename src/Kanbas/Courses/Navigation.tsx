import { Link, useParams, useLocation } from "react-router-dom";
export default function CoursesNavigation() {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          to={link}
          id={`wd-course-${link}-link`}
          className={`list-group-item border border-0
              ${
                pathname.includes(link) ? "text-black active " : "text-danger"
              }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
