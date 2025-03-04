"use client";
import { useCategories } from "@/hooks/categories.hook";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CoursesCategory = ({
  setSelectedCategories,
  selectedCategories,
}: any) => {
  const { categories } = useCategories();

  const handleCheckboxChange = (id: string) => {
    setSelectedCategories((prev: any) =>
      prev.includes(id)
        ? prev.filter((categoryId: string) => categoryId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-[20%]">
      <h2 className="text-base font-semibold mb-5">Course Category</h2>
      <div className="mb-4 flex flex-col gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-row items-center gap-2 justify-between space-x-3"
          >
            <div className="flex flex-row gap-2">
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCheckboxChange(category.id)}
                className="cursor-pointer"
                id={category.id}
              />
              <Label
                htmlFor={category.id}
                className="font-normal cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
            <span>{category._count.course}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { CoursesCategory };
