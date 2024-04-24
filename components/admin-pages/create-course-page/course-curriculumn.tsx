import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import UploadPdf from "@/components/contain-next-pdf"; // Assuming this component properly handles PDF uploads and previews
import { MdUpload } from "react-icons/md";
import BottomNavigator from "./bottom-navigator";

interface CourseCurriValues {
  curriculum: string; // Only curriculum is required
}

interface Props {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  courseCurri: CourseCurriValues;
  setCourseCurri: React.Dispatch<React.SetStateAction<CourseCurriValues>>;
  submitCourseHandler: () => void;

}

const courseCurriSchema = Yup.object({
  curriculum: Yup.string().required("Please upload course curriculum PDF"),
});

const CourseCurriculumn: React.FC<Props> = ({
  active,
  setActive,
  courseCurri,
  setCourseCurri,
  submitCourseHandler,
}) => {
  const [dragging, setDragging] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<CourseCurriValues>({
    defaultValues: courseCurri,
    resolver: yupResolver(courseCurriSchema),
  });

  const curriculum = watch("curriculum");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setValue("curriculum", reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: CourseCurriValues) => {
    setActive(active + 1);
    setCourseCurri(data);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const dropHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValue("curriculum", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const backHandler = () => {
    setActive(active - 1);
  };

  const optionsHandler = () => {
    // if (
    //   courseContentData[courseContentData.length - 1].title === "" ||
    //   courseContentData[courseContentData.length - 1].description === "" ||
    //   courseContentData[courseContentData.length - 1].videoUrl === "" ||
    //   courseContentData[courseContentData.length - 1].videoLength === 0 ||
    //   courseContentData[courseContentData.length - 1].links[0].title === "" ||
    //   courseContentData[courseContentData.length - 1].links[0].url === ""
    // ) {
    //   toast.error("Please fill in all information!");
    // } else {
    setActive(active + 1);
    submitCourseHandler();
    // }
  };

  return (
    <>
      <div className="w-[80%] mx-auto mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="curriculum" className="form-input-label">Course Curriculum PDF</label>
          <label
            htmlFor="curriculum"
            className={`w-full min-h-[850px] relative dark:border-white p-3 rounded-[5px] cursor-pointer border flex flex-col justify-center ${dragging ? "bg-blue-500" : "bg-transparent"}`}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
          >
            {curriculum ? (
              <iframe src={curriculum} style={{ width: '100%', height: '800px' }} frameBorder="0" title="Curriculum PDF Preview"></iframe>
            ) : (
              <span className="text-center">
                <MdUpload size={40} className="mx-auto mb-2" />
                Drag and drop PDF file here or click to browse
              </span>
            )}
          </label>
          <input type="file" accept="application/pdf" id="curriculum" hidden onChange={handleFileChange} />
        </form>
      </div>
      <BottomNavigator
        backHandler={backHandler}
        nextHandler={optionsHandler}
        customClasses="w-[80%] mx-auto"
      />
    </>
  );
};

export default CourseCurriculumn;
