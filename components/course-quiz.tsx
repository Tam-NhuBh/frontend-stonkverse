import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import BtnWithIcon from "./btn-with-icon";
import { FcCursor } from "react-icons/fc";
import toast from "react-hot-toast";

interface QuizQuestion {
  id: string;
  title: string;
  mockAnswer: string[];
  correctAnswer: string[];
  maxScore: number;
}

interface Props {
  questions: QuizQuestion[];
}

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 10000, // 10 giây, bạn có thể điều chỉnh giá trị này
};

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url, axiosConfig);
    return res.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const CourseQuiz: FC<Props> = ({ questions }): JSX.Element => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>({});
  const [score, setScore] = useState<number | null>(null);
  const [questionScores, setQuestionScores] = useState<{ [key: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/add-answer-quiz`, // Adjust to your API endpoint
    fetcher
  );

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch quiz questions.");
    }
  }, [error]);

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let newScore = 0;
    let newQuestionScores: { [key: number]: number } = {};

    const submissionData = questions.map((question, index) => ({
      questionId: question.id,
      answer: selectedAnswers[index] || []
    }));

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-answer-quiz`, submissionData);
      const { totalScore, detailedScores } = response.data;

      newScore = totalScore;
      newQuestionScores = detailedScores;

    } catch (error) {
      console.error("Failed to submit quiz answers:", error);
      toast.error("An error occurred while submitting your answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }

    setScore(newScore);
    setQuestionScores(newQuestionScores);
  };

  if (error) return <div>An error occurred while fetching data.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white dark:bg-slate-900 border-l dark:border-slate-700 border rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Quiz</h2>
      <div className="grid gap-4 mb-5">
        {data.map((question: QuizQuestion, index: number) => {
          const tickType = question.correctAnswer.length > 1 ? 'checkbox' : 'radio';
          return (
            <div key={index} className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg">
              <p className="text-lg font-semibold mb-2">
                Question {index + 1}: {question.title}
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
        disabled={isSubmitting}
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