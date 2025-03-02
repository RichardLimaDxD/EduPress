import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white w-full h-16 flex flex-row justify-center gap-6 items-center shadow-2xl">
      <div className="w-full py-10 px-42 mx-w-7xl mx-auto flex flex-row items-center justify-between">
        <div className="flex flex-row">
          <Link href={"/"}>
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={"120"}
              height={"20"}
              className="hover:scale-125 duration-500"
            />
          </Link>
        </div>
        <div className="flex flex-row">
          <ul className="flex flex-row gap-6">
            <li className="cursor-pointer hover:text-orange-400 hover:scale-105 duration-300">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="cursor-pointer hover:text-orange-400 hover:scale-105 duration-300">
              <Link href={"#"}>Cursos</Link>
            </li>
            <li className="cursor-pointer hover:text-orange-400 hover:scale-105 duration-300">
              <Link href={"/"}>Blog</Link>
            </li>
            <li className="cursor-pointer hover:text-orange-400 hover:scale-105 duration-300">
              <Link href={"/"}>Página</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-row justify-center items-center gap-6">
          <Link
            href={"#"}
            className="cursor-pointer hover:text-orange-400 hover:scale-105 duration-300"
          >
            LearnPress Add-On
          </Link>
          <Link
            href={"#"}
            className="cursor-pointer hover:text-orange-400 hover:scale-105 duration-300"
          >
            Premium Theme
          </Link>
        </div>

        <div className="flex flex-row justify-center items-center gap-8">
          <Link
            href={"/login"}
            className="cursor-pointer hover:text-orange-400 hover:scale-105 duration-300"
          >
            Login / Registrar-se
          </Link>

          <Image
            src={"/Search.svg"}
            alt="search"
            width={"30"}
            height={"30"}
            className="cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export { Header };
