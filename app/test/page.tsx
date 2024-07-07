import { NextPage } from "next";

interface Props { }

const Loading: NextPage<Props> = () => {
  return (
    <div className="relative dark:bg-tertiary min-h-screen overflow-hidden">
      <div className="loading-page-body">
      <div className="pulsing-2"></div>
      
      </div>

    </div>
  );
};

export default Loading;
