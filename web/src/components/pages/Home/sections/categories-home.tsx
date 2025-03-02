const CategoriesHome = () => {
  return (
    <section className="w-full flex flex-col py-22 px-42">
      <div className="flex flex-rol justify-between items-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Top Categories</h2>
          <p className="font-light">Explore our Popular Categories</p>
        </div>
        <span className="border-2 border-black w-35 rounded-full p-2 text-center font-medium">
          All Categories
        </span>
      </div>
    </section>
  );
};

export { CategoriesHome };
