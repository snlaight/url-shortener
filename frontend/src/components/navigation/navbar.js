import React from "react";

const NavBar = () => {

  return (
    <div className="2xl:container 2xl:mx-auto">
      <div className="rounded py-5 px-7">
        <nav className="flex justify-between">
          <div className="flex items-center space-x-3 lg:pr-16 pr-6">
            <h2 className="font-normal text-2xl leading-6 text-white">
              URL-SHORTENER
            </h2>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default NavBar;
