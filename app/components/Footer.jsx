import React from "react";
import Image from "next/image";

const Footer = () => {
  const resourcesLinks = [
    { name: "Blog", href: "https://mindthatseekstruth.com/blog" },
    { name: "Research", href: "https://mindthatseekstruth.com/research" },
  ];

  const followUsLinks = [
    { name: "Facebook", href: "https://facebook.com/mindthatseekstruth" },
    { name: "Twitter", href: "https://twitter.com/truthseekingmind" },
    { name: "Instagram", href: "https://instagram.com/mindthatseekstruth" },
    { name: "TikTok", href: "https://www.tiktok.com/@truthseekingmind" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-16 md:mb-0 md:w-fit w-full justify-center flex">
            <a href="/" className="flex items-center">
            <Image
        src="/logo.png"
        alt="Mind that seeks truth | Break up cures | HOCD OCD"
        width={120}
        height={120}
        draggable={false}
        className="select-none "
        /> 
              <span className="self-center text-2xl font-semibold whitespace-nowrap md:block hidden">
                Mind That Seeks Truth
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Follow Us</h2>
              <ul className="text-gray-400 font-medium">
                {followUsLinks.map((link, index) => (
                  <li key={index} className="mb-4">
                    <a href={link.href} target="_blank" className="hover:underline">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
              <ul className="text-gray-400 font-medium">
                {legalLinks.map((link, index) => (
                  <li key={index} className="mb-4">
                    <a href={link.href} className="hover:underline">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © {new Date().getFullYear()} <a href="/" className="hover:underline">Mind That Seeks Truth™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {followUsLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white ml-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div  className="w-full flex justify-center p-4">
        <p className="text-gray-300">
            Designed & Developed by <a href="https://anziandco.com" target="_blank" className="font-bold text-white"> Anzi &. CO </a>
        </p>

      </div>
    </footer>
  );
};

export default Footer;
