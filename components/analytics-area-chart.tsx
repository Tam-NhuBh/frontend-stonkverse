import { FC, useState, useMemo, JSX } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  isDashboard?: boolean;
  data: any;
  title: string;
}

const AnalyticsAreaChart: FC<Props> = ({
  isDashboard,
  data,
  title,
}): JSX.Element => {
  const [selectedRange, setSelectedRange] = useState<number>(0);

  // Filter data
  const displayData = useMemo(() => {
    
    if (!data || data.length === 0) {
      return [];
    }
    
    if (selectedRange === 0) {
      return data;
    }
    
    const filtered = data.slice(-selectedRange);
    return filtered;
  }, [data, selectedRange]);

  const handleRangeChange = (value: number) => {
    setSelectedRange(value);
  };

  return (
    <div
      className={`${
        isDashboard
          ? "shadow-md border dark:border-none rounded-sm dark:bg-[#111C43] pb-5"
          : "mt-[50px]"
      }`}
    >
      <h1
        className={`text-center font-bold text-2xl mb-4 ${
          isDashboard && "py-4 text-lg font-semibold"
        }`}
      >
        {title}
      </h1>

      {!isDashboard && (
        <>
          {/* Test buttons - Very simple */}
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => handleRangeChange(0)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              All (Click me!)
            </button>
            <button
              onClick={() => handleRangeChange(3)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Last 3
            </button>
            <button
              onClick={() => handleRangeChange(6)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Last 6
            </button>
          </div>

          <p className="text-center">
            Selected: {selectedRange === 0 ? "All" : `Last ${selectedRange}`} | 
            Showing {displayData.length} items
          </p>
        </>
      )}

      <div
        className={`w-full ${
          isDashboard ? "aspect-[3]" : "h-screen"
        } flex items-center justify-center`}
      >
        <ResponsiveContainer
          width={isDashboard ? "100%" : "90%"}
          height={!isDashboard ? "50%" : "100%"}
        >
          <AreaChart
            data={displayData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Count"
              stroke="#4d62d9"
              fill="#4d62d9"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsAreaChart;