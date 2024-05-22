import { FC, useState } from "react";
import BtnWithIcon from "./btn-with-icon";
import { FcCursor } from "react-icons/fc";

interface QuizQuestion {
  title: string;
  mockAnswer: string[];
  correctAnswer: string[];
  maxScore: number;
}

interface Props {
  questions: QuizQuestion[];
}

const CourseQuiz: FC<Props> = ({ questions }): JSX.Element => {
  //Follow the state of answers on each question by key index
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>({}); //q
  //the state of the score with initial score equal null (user have not answered yet)
  const [score, setScore] = useState<number | null>(null);
  //calculate the score on each question by key index 
  const [questionScores, setQuestionScores] = useState<{ [key: number]: number }>({});
    
  
    // console.log(selectedAnswers)
  const handleAnswerChange = (questionIndex: number, answer: string, isChecked: boolean) => {
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };
      if (isChecked) {
        if (newAnswers[questionIndex]) {
          newAnswers[questionIndex].push(answer);
        } else {
          newAnswers[questionIndex] = [answer];
        }
      } else {
        newAnswers[questionIndex] = newAnswers[questionIndex].filter((ans) => ans !== answer);
      }
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    let newQuestionScores: { [key: number]: number } = {};

    questions.forEach((question, index) => {
      const userAnswers = selectedAnswers[index] || [];
      const correctAnswers = question.correctAnswer;
      const isCorrect = correctAnswers.length === userAnswers.length && correctAnswers.every((answer) => userAnswers.includes(answer));

      if (isCorrect) {
        newScore += question.maxScore;
        newQuestionScores[index] = question.maxScore;
      } else {
        newQuestionScores[index] = 0;
      }
    });

    setScore(newScore);
    setQuestionScores(newQuestionScores);
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 border-l dark:border-slate-700 border rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Quiz</h2>
      <div className="grid gap-4 mb-5">
        {questions.map((question, index) => {
          const tickType = question.correctAnswer.length > 1 ? 'checkbox' : 'radio';
          return (
            <div key={index} className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg">
              <p className="text-lg font-semibold mb-2">
                Question {index + 1}: {question.title}
                {/* Display score for user checking */}
                {score !== null && (
                  <span className="ml-2 text-sm text-red-500 dark:text-red-400">
                    ({questionScores[index]}/{question.maxScore} points)
                  </span>
                )}
              </p>

              {question.mockAnswer.map((answer, ansIndex) => (
                <label key={ansIndex} className="flex items-center mt-2 text-gray-600 dark:text-white cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-900 duration-300 transition">
                  <input
                    type={tickType}
                    name={`question-${index}`}
                    className={`mr-2 ${tickType === 'radio' ? 'rounded-full' : 'rounded-md'}`}
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, answer, e.target.checked)}
                  />
                  {answer}
                </label>
              ))}
            </div>
          );
        })}
      </div>

      <BtnWithIcon
        content="SUBMIT"
        type="submit"
        onClick={handleSubmit}
        iconBehind={FcCursor}
        iconSize={25}
        iconCustomClasses="-mt-1"
      />
      {score !== null && (
        <div className="mt-4 text-2xl font-semibold">
          Your total score: {score}/{questions.reduce((acc, question) => acc + question.maxScore, 0)}
        </div>
      )}
    </div>
  );
};

export default CourseQuiz;
