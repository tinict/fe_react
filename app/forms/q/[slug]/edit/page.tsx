"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Question from "./question";

import { QueryQuestions } from "@/common/api/form/questions.query";
import { GetQuestions } from "@/common/api/form/questions.get";

/**
 * Common
 */
interface Question {
  id: number;
  name: string;
  type: string;
}

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const pathname = usePathname();

  /**
   * Fetch API Get questions / query with params: id
   * @param id
   */
  const fetchQueryQuestion = async (id: any) => {
    const data = await GetQuestions(id);

    console.log(data, id);
    if (data) setQuestions(data?.props?.repo.data);
  };

  /**
   * common
   */
  const splitPath = (url: string) => {
    const regex = /forms\/q\/([^\/]+)\/edit/;

    const match = url.match(regex);
    const slug = match ? match[1] : null;

    return slug;
  };

  useEffect(() => {
    let id = splitPath(pathname);
    console.log("log: ", id)
    fetchQueryQuestion(id);
  }, []);

  return (
    <section className="w-[770px] pt-[12px]">
      <Question 
        dataques={questions} 
        idCategory={splitPath(pathname)} 
      />
    </section>
  );
}
