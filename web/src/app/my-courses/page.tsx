import { CoursePanel } from "@/components/pages/my-courses/side/side";

const MyCourses = () => {
  return (
    <main className="w-full flex flex-row justify-between gap-6 py-12 px-42">
      <div>
        <CoursePanel />
      </div>
      <section></section>
    </main>
  );
};

export default MyCourses;
