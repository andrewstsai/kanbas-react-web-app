import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function QuizControlButtons({
  quizId,
  deleteQuiz,
}: {
  quizId: string;
  deleteQuiz: (quizId: string) => void;
}) {
  return (
    <div className="d-flex align-items-center">
      
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => deleteQuiz(quizId)}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 ms-2" />
    </div>
  );
}
