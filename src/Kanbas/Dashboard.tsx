import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/reactjs.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1234 React JS
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Full Stack software developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/3800/Home"
              >
                <img src="/images/logic.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS3800 Logic & Computation
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    LaTeX Writer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/4550/Home"
              >
                <img src="/images/webdev.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS4550 Web Development
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Front end software developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/4530/Home"
              >
                <img src="/images/softeng.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS4550 Software Engineering
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Full stack software engineer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/3000/Home"
              >
                <img src="/images/algo.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS3000 Algorithms
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Interview Prepper
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1210/Home"
              >
                <img src="/images/coop.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1210 Professional Development for Khoury Co-op
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Co-op worker
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1200/Home"
              >
                <img src="/images/seminar.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1200 First Year Seminar
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Freshman
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
