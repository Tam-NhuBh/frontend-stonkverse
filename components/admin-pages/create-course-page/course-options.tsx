import { Dispatch, FC, SetStateAction } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { Check } from "lucide-react";

interface Props {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

const steps = [
  { number: 1, name: "Course Information" },
  { number: 2, name: "Course Options" },
  { number: 3, name: "Course Content" },
  { number: 4, name: "Course Preview" },
];

const CourseOptions: FC<Props> = ({ active, setActive }): JSX.Element => {
  return (
    <div className="sticky top-1 bg-white dark:bg-gray-900 rounded-sm border dark:border-gray-600 shadow-sm p-4 mb-6">
      <div className="relative">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex flex-col items-center relative z-10 ${
                active === step.number - 1 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  active === step.number - 1
                    ? "bg-blue-500 text-white"
                    : active > step.number - 1
                      ? "bg-blue-200 text-blue-700"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {active > step.number - 1 ? <Check className="h-5 w-5" /> : step.number}
              </div>
              <div className="text-xs font-medium text-center">{step.name}</div>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CourseOptions;