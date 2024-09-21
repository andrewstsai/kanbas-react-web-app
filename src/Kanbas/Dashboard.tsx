import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/3800/Home"
          >
            <img src="/images/logic.jpg" width={200} />
            <div>
              <h5>CS3800 Logic & Computation</h5>
              <p className="wd-dashboard-course-title">LaTeX Writer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/4550/Home"
          >
            <img src="/images/webdev.jpg" width={200} />
            <div>
              <h5>CS4550 Web Development</h5>
              <p className="wd-dashboard-course-title">
                Front end software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/4530/Home"
          >
            <img src="/images/softeng.jpg" width={200} />
            <div>
              <h5>CS4550 Software Engineering</h5>
              <p className="wd-dashboard-course-title">
                Full stack software engineer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/3000/Home"
          >
            <img src="/images/algo.jpg" width={200} />
            <div>
              <h5>CS3000 Algorithms</h5>
              <p className="wd-dashboard-course-title">Interview Prepper</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1210/Home"
          >
            <img src="/images/coop.jpg" width={200} />
            <div>
              <h5>CS1210 Professional Development for Khoury Co-op</h5>
              <p className="wd-dashboard-course-title">Co-op worker</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1200/Home"
          >
            <img src="/images/seminar.jpg" width={200} />
            <div>
              <h5>CS1200 First Year Seminar</h5>
              <p className="wd-dashboard-course-title">Freshman</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
