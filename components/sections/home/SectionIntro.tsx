import React from "react";

function SectionIntro() {
  return (
    <div>
      <div className="w-full h-screen overflow-hidden relative">
        <div className="absolute pl-10 pr-20 top-[50%] translate-y-[-50%] right-[50px]">
          <p className="text-[50px] text-[#f5f5f4] leading-[54px] font-medium">
            Get everything out of an eCommerce website by working with a partner
            who is all about
          </p>
          <p className="text-[50px] text-[#d3441c] font-medium mt-8">
            MIGRATION . DEVELOPMENT . INTEGRATION .
          </p>
        </div>
        <img
          className="w-full h-full object-cover object-center"
          src="https://i.pinimg.com/736x/65/f9/81/65f981d62c1398ddad3dee160d30444b.jpg"
          alt="zauzau"
        />
      </div>
    </div>
  );
}

export default SectionIntro;
