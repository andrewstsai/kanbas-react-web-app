import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function QuizzesControlButtons() {
  return (
    <div className="float-end">
      <BsPlus className="fs-2 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
