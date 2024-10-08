import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function AssignmentsControlButtons() {
  return (
    <div className="float-end">
      <div className="rounded border border-black d-inline-block text-center rectangle-text fs-5 p-1 me-2">
        40% of total
      </div>
      <BsPlus className="fs-2 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
