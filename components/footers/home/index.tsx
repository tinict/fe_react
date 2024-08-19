import { Logo } from "@/components/icons";
import React from "react";

const ullis = [
  {
    title: "OUR SERVICES",
    lis: [
      { content: "eCommerce Development", to: "" },
      { content: "eCommerce Migrations", to: "" },
      { content: "eCommerce Integrations", to: "" },
      { content: "ERP Consulting", to: "" },
    ],
  },
  {
    title: "RESOURCES",
    lis: [
      { content: "Blogs", to: "" },
      { content: "Guides and White papers", to: "" },
      { content: "Newsroom", to: "" },
    ],
  },
  {
    title: "ABOUT",
    lis: [
      { content: "Our Company", to: "" },
      { content: "Contact us", to: "" },
      { content: "Careers", to: "" },
    ],
  },
];

function FooterHome() {
  return (
    <div className="w-full px-16 py-20 bg-black font-manrope text-[16px] text-gray-200 font-light flex gap-32">
      <div className="max-w-[300px]">
        <div className="flex items-center justify-center text-[40px]">
          <Logo size={100} />
          <p className="font-bold text-inherit">Zeal Bio</p>
        </div>
        <p>⚲ 3600 Dallas Highway Suite 230–360, Marietta, GA 30064</p>
        <p>☏ +1 678 667 2185</p>
        <p>✉︎ sales@variux.com</p>
      </div>
      <div className="flex-1 flex flex-col justify-between gap-28">
        <div className="grid grid-cols-3">
          {ullis.map((ulli, index) => (
            <div key={index}>
              <p className="text-[18px] text-[#008c95] font-medium mb-4">
                {ulli.title}
              </p>
              <ul>
                {ulli.lis.map((li, index2) => (
                  <li key={index2} className="mb-4">
                    {li.content}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p>Copyrights © 2023 Variux Inc. All rights reserved.</p>
          <p>
            <span className="mr-6">|</span>Privacy Policy
          </p>
          <p>
            <span className="mr-6">|</span>Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterHome;
