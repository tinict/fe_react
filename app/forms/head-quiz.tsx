"use client";

import { faFolder, faEye, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { GetCategory } from "@/common/api/form/category.get";
import { PutCategory } from "@/common/api/form/category.put";

interface Category {
  id?: string;
  name: string;
}

export const HeadQuiz = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [category, setCategory] = useState<Category>();

  const splitPath = (url: string): string => {
    const regex = /forms\/q\/([^\/]+)\/edit/;

    const match = url.match(regex);
    const slug = match ? match[1] : "";

    return slug;
  };

  const handleViewform = () => {
    router.push(`/forms/q/e/${splitPath(pathname)}/viewform`);
  };

  const handleSaveFormQuiz = async () => {
    const idCate: string = uuidv4();
    const name: string = category ? category?.name : "";

    await PutCategory(splitPath(pathname), {
      id: idCate,
      name,
    });
  };

  const fetchApiGetCategory = async (id: string) => {
    const data = await GetCategory(id);

    if (data) {
      console.log(data);
      setCategory(data.props.repo);
    }
  };

  useEffect(() => {
    fetchApiGetCategory(splitPath(pathname));
  }, []);

  return (
    <>
      <header className="h-[60px] w-full flex items-center justify-between px-2">
        <div className="flex items-center space-x-4">
          <div className="flex h-[22px] w-[22px] items-center justify-center">
            <FontAwesomeIcon
              className="text-gray-700 w-ful h-full text-[blue] cursor-pointer"
              icon={faFolder}
            />
          </div>
          <span>
            <Input
              placeholder={"Template without title"}
              type="text"
              value={category?.name}
              variant={"underlined"}
              onChange={(e) =>
                setCategory({
                  ...category,
                  name: e.target.value,
                })
              }
            />
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex h-[22px] w-[22px] items-center justify-center">
            <FontAwesomeIcon
              className="text-gray-700 w-ful h-full text-[gray] cursor-pointer"
              icon={faLink}
            />
          </div>
          <div className="flex h-[22px] w-[22px] items-center justify-center">
            <FontAwesomeIcon
              className="text-gray-700 w-ful h-full text-[gray] cursor-pointer"
              icon={faEye}
              onClick={handleViewform}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSaveFormQuiz}
          >
            Save
          </button>
        </div>
      </header>
    </>
  );
};
