"use client";
import { CousesSection } from "@/components/pages/courses/section/courses-section";
import { CoursesCategory } from "@/components/pages/courses/side/couses-category";
import { useState } from "react";

const CoursesPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <main className="w-full flex flex-row justify-between gap-6 py-12 px-42">
      <CousesSection selectedCategories={selectedCategories} />
      <CoursesCategory
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
      />
    </main>
  );
};

export default CoursesPage;
