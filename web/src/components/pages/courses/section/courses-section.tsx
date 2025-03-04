import { Search } from "lucide-react";
import { RenderCourses } from "./render/render-courses";
import { useCouses } from "@/hooks/courses.hook";

const CousesSection = ({ selectedCategories }: any) => {
  const { setSearch } = useCouses();

  const submit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    setSearch("");
  };

  return (
    <section className="w-full">
      <div className=" flex flex-row justify-between">
        <h2 className="text-2xl font-bold">All Courses</h2>
        <div>
          <form action="" onSubmit={submit}>
            <input
              onChange={(event) => setSearch(event.target.value)}
              type="text"
              placeholder="Search"
              className="border-b-1 outline-none p-2"
            />
            <button type="submit" className="cursor-pointer">
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>
      <RenderCourses selectedCategories={selectedCategories} />
    </section>
  );
};

export { CousesSection };
