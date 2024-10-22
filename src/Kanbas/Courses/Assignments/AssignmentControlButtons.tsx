import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function AssignmentControlButtons() {
  return (
    <div className="d-flex align-items-center">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 ms-2" />
    </div>
  );
}
