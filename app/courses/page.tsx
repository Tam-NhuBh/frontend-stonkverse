import CategoryTag from "@/components/all-courses-page/category-tag";
import CourseCard from "@/components/course-card";
import Heading from "@/components/heading";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
// import { getAllCategories, getAllCoursesData } from "@/lib/fetch-data";
import { getAllCoursesData } from "@/lib/fetch-data";
import { FC } from "react";
import { ICategory } from "@/components/home-page/categories";
import { IFetchedCourse } from "@/components/home-page/courses";

interface Props { }

const page: FC<Props> = async (props): Promise<JSX.Element> => {
  const courses = (await getAllCoursesData()) as IFetchedCourse[];
  // const categories = (await getAllCategories()) as ICategory[];

  return (
    <>
      <Heading
        title="All Courses"
      />
      <div className="min-h-screen">
        <Header />
        <div className="container mt-8 mb-14">
          <div>
            {/* <h2 className="section-title">
              <p className="font-semibold text-tertiary dark:text-dark_text text-center mb-6 text-lg">
                We found{" "}
                <span className="text-gradient font-bold">
                  {courses.length} Courses
                </span>{" "}
                available for you
              </p>

            </h2> */}


            <div className="mt-10 main-grid">
              {courses?.map((course) => (
                <CourseCard key={course._id.toString()} course={course} />
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default page;
