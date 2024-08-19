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

interface Category {
  id: string;
  name: string;
}

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
    });
  };

  const fetchGetCategories = async () => {
    const data = await GetCategories();

    if (data) {
      console.log(data);
      setCategories(data?.props?.repo);
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
    <section className="w-full">
      <div className="p-4">
        <div className="h-[64px] flex items-center">
          <h2 className="text-lg font-semibold text-blue-500">
            Start a new quiz
          </h2>
        </div>
        <div className="flex flex-wrap">
          <div
            className="mr-[19px] mb-[24px] cursor-pointer"
            onClick={() => handleCreateQuizForm(genUUIDV4)}
          >
            <div className="w-[171px] h-[128px] shadow-[rgba(0,0,0,0.16)_0px_1px_4px] flex flex-column items-center justify-center">
              <div className="w-[100px] h-[100px] flex items-center justify-center">
                <FontAwesomeIcon
                  className="text-[50px] text-blue-500"
                  icon={faPlus}
                />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-[14px] text-gray-400">Create quiz blank</p>
            </div>
          </div>
          {categories?.map((category: any, index: number) => (
            <div
              key={index}
              className="mr-[19px] mb-[24px] cursor-pointer group relative"
            >
              <div className="w-[171px] h-[128px] shadow-[rgba(0,0,0,0.16)_0px_1px_4px] p-2 flex flex-column items-center justify-center">
                <div className="h-[100px] w-[100px]">
                  <img
                    alt={category?.name}
                    className="w-full object-cover"
                    src="https://www.torontomu.ca/content/dam/google/teach-with-google-apps/quizzes-surveys/create-google-form/google-form.png"
                  />
                </div>

                <div className="opacity-0 group-hover:opacity-100 flex justify-center items-center bg-white bg-opacity-50 p-[2px] rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-full mb-[16px] absolute right-0 top-0 left-0 bottom-3 space-x-2">
                  <span
                    className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer"
                    onClick={() => redirectEdit(category?.id)}
                  >
                    <FontAwesomeIcon
                      className="text-red-700 text-xl"
                      icon={faPenToSquare}
                    />
                  </span>
                  <span
                    className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer"
                    onClick={() => handleDeleteCategory(category?.id)}
                  >
                    <FontAwesomeIcon
                      className="text-red-700 text-xl"
                      icon={faTrash}
                    />
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-[14px] text-gray-400">{category?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
