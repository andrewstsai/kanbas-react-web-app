export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <br />
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd_group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="PERCENTAGE">Percentage</option>
              <option value="LETTER">Letter Grade</option>
            </select>
          </td>
        </tr>

        <br />        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">OFFLINE</option>
            </select>{" "}
            <br /> <br />
            Online Entry Options <br />
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />
            <input type="checkbox" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />
            <input type="checkbox" id="wd-media-recordings" />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />
            <input type="checkbox" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />
            <input type="checkbox" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            Assign to
            <br />
            <input id="wd-assign-to" value={"Everyone"} />
            <br />
            <br />
            <label htmlFor="wd-due-date"> Due: </label>
            <br />
            <input type="date" id="wd-due-date" value="2024-05-13" />
            <br />
            <br />
            <td>
              <label htmlFor="wd-available-from"> Available From: </label>
              <br />
              <input type="date" id="wd-available-from" value="2024-05-06" />
            </td>
            <td>
              <label htmlFor="wd-available-until"> Available Until: </label>
              <br />
              <input type="date" id="wd-available-until" value="2024-05-20" />
            </td>
            <br />
            <td align="right" valign="top">
              <button id="wd-cancel" type="button">
                Cancel
              </button>
              <button id="wd-save" type="button">
                Save
              </button>
            </td>
          </td>
        </tr>
      </table>
    </div>
  );
}
