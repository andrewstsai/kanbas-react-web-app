import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function QuestionControlButtons({
  questionId,
  deleteQuestion,
}: {
  questionId: string;
  deleteQuestion: (questionId: string) => void;
}) {
  return (
    <div className="d-flex align-items-center">
      
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => deleteQuestion(questionId)}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 ms-2" />
    </div>
  );
}
