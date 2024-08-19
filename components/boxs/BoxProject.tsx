import React from "react";
import CollapseProject from "../collapses/CollapseProject";

const a = {
  title: "eCommerce Website Development",
  img: "https://images.squarespace-cdn.com/content/v1/63622c27c2d35d6fc2b3ee8b/95f35e35-4f92-42d4-82cb-f657eab18f6d/2.png?format=1500w",
  collapses: [
    { title: "Full-stack eCommerce development", content: "" },
    { title: "Website support and maintainance", content: "" },
  ],
};

function BoxProject({ project }: { project: any }) {
  return (
    <div className="w-full flex flex-col text-left">
      <img className="rounded-2xl" src={project.img} alt="img" />
      <h2 className="text-[#008c95] text-[24px] underline underline-offset-4 float-start my-4">
        {project.title}
      </h2>
      <div className="">
        {project.collapses.map((collapse: any, index: number) => (
          <CollapseProject key={index} project={collapse} />
        ))}
      </div>
    </div>
  );
}

export default BoxProject;
