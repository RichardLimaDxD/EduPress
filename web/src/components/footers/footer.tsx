import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 w-full flex flex-col gap-7 py-12 px-42">
      <div className="flex flex-row justify-between gap-5">
        <div className="flex flex-col items-baseline gap-6">
          <Link href="/">
            <Image src={"/logo.svg"} alt="logo" width={150} height={140} />
          </Link>
          <p className="w-80 text-base ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex flex-col items-baseline gap-7">
          <h2 className="font-bold text-2xl">GET HELP</h2>
          <p className="font-bold text-gray-500 hover:text-orange-500 cursor-pointer duration-300">
            Contact Us
          </p>
          <p className="font-bold text-gray-500 hover:text-orange-500 cursor-pointer duration-300">
            Latest Articles
          </p>
          <p className="font-bold text-gray-500 hover:text-orange-500 cursor-pointer duration-300">
            FAQ
          </p>
        </div>

        <div className="flex flex-col items-baseline gap-7">
          <h2 className="font-bold text-2xl">PROGRAMS</h2>
          <p className="font-bold text-gray-500 hover:text-orange-500 cursor-pointer duration-300">
            Art & Design
          </p>
          <p className="font-bold text-gray-500 hover:text-orange-500 cursor-pointer duration-300">
            Business
          </p>
          <p className="font-bold text-gray-500 hover:text-orange-500 cursor-pointer duration-300">
            IT & Software
          </p>
          <p className="font-bold text-gray-500 hover:text-orange-500 cursor-pointer duration-300">
            Languages
          </p>
          <p className="font-bold text-gray-500 hover:text-orange-500 cursor-pointer duration-300">
            Programming
          </p>
        </div>

        <div className="flex flex-col items-baseline gap-7">
          <h2 className="font-bold text-2xl">CONTACT US</h2>
          <p className="w-85 text-base text-gray-600">
            Address: 2321 New Design Str, Lorem Ipsum10 Hudson Yards, USA
          </p>

          <div className="flex flex-col gap-2">
            <p className="text-base text-gray-600">
              Tel: + (123) 2500-567-8988
            </p>
            <p className="text-base text-gray-600">
              Mail: supportlms@gmail.com
            </p>
          </div>

          <div className="flex flex-row gap-4">
            <Image src={"/Icon (1).svg"} alt="icon" width={20} height={25} />
            <Image src={"/Icon (2).svg"} alt="icon" width={20} height={25} />
            <Image src={"/Icon (3).svg"} alt="icon" width={20} height={25} />
            <Image src={"/Icon (4).svg"} alt="icon" width={20} height={25} />
            <Image src={"/Icon (5).svg"} alt="icon" width={20} height={25} />
          </div>
        </div>
      </div>
      <p className="text-center mt-10">
        Copyright © 2024 LearnPress LMS | Powered by ThimPress
      </p>
    </footer>
  );
};

export { Footer };
