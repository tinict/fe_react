"use client";

import { useEffect, useState } from "react";
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { GetCategories } from "@/common/api/form/categories.get";
import { PostCategories } from "@/common/api/form/categories.post";
import { PostQuestions } from "@/common/api/form/questions.post";
import { deleteCategory } from "@/common/api/form/category.delete";
import { FcDocument } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaChartArea } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

interface Category {
  id: string;
  name: string;
};

export default function Page() {
  const [categories, setCategories] = useState<Category[] | []>([]);
  const router = useRouter();
  let genUUIDV4 = uuidv4();

  const fetchCreateQuestion = async (question: any) => {
    await PostQuestions(question);
  };

  const handleSaveFormQuiz = async (id: string) => {
    await PostCategories({
      id,
      name: "Quiz form without title",
    });

    await fetchCreateQuestion({
      id: genUUIDV4,
      name: "Quiz form without title",
      type: "multiple-choice",
      category_id: id,
      results: [],
      explain: ""
    });
  };

  const fetchGetCategories = async () => {
    const data = await GetCategories();

    if (data) {
      console.log(data?.props?.repo);
      setCategories(data?.props?.repo?.data);
    }
  };

  useEffect(() => {
    fetchGetCategories();
  }, []);

  const handleCreateQuizForm = async (id: string) => {
    await handleSaveFormQuiz(id);
    await redirectEdit(id);
  };

  const handleDeleteCategory = async (id: string) => {
    setCategories(
      categories.filter((category: Category) => {
        return category.id !== id;
      }),
    );
    await deleteCategory(id);
  };

  const redirectEdit = async (id: string) => {
    router.push(`/forms/q/${id}/edit`);
  };

  return (
    <section className="2xl:container">
      <div className="grid grid-cols-2 mt-4">
        <div>
          <h2 className="text-lg font-semibold text-[#2c31cf]">
            Start a new quiz
          </h2>
        </div>
        <div className="flex items-center justify-end">
          <button className="cursor-pointer" onClick={() => handleCreateQuizForm(genUUIDV4)}>
            <IoIosAddCircle className="text-[#2c31cf] h-[30px] w-[30px]" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 mb-5">
        <p className="text-sm text-[#943ab8]">
          Explore forms by clicking on any card to get started:
        </p>
      </div>
      <div className="grid 2xl:grid-cols-10 xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-7 sm:grid-cols-5 grid-cols-2 gap-4">
        {categories?.map((category: any, index: number) => (
          <div
            key={index}
            className="cursor-pointer group relative"
          >
            <div className="shadow-[rgba(0,0,0,0.16)_0px_1px_4px] grid grid-cols-1 p-2 gap-4">
              <div className="flex items-center justify-center">
                <FcDocument className="w-[80px] h-[80px]" />
              </div>
              <div className="grid grid-cols-3 gap-2 justify-center items-center">
                <CiEdit
                  className="text-blue-700 text-lg cursor-pointer h-[22px] w-[22px]"
                  onClick={() => redirectEdit(category?.id)}
                />
                <FaChartArea
                  className="text-blue-700 text-lg cursor-pointer h-[22px] w-[22px]"
                />
                <MdDeleteOutline
                  className="text-blue-700 text-lg cursor-pointer h-[22px] w-[22px]"
                  onClick={() => handleDeleteCategory(category?.id)}
                />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-[14px] text-gray-400">{category?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
