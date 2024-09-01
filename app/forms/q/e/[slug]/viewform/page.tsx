"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import QuestionBox from "./questionbox";

import { GetQuiz } from "@/common/api/form/quiz.get";

/**
 * common
 */
interface Answer {
  id: string;
  value: string;
}

interface Question {
  id: number;
  name: string;
  type: string;
  answers: Answer[];
  results: string[];
  explain: string;
}

interface Category {
  id: number;
  name: string;
  questions: Question[];
}

interface GetCategory {
  props?: {
    repo?: Category;
  };
}

export default function Page({ ...props }) {
  const [questions, setQuestions] = useState<Question[] | []>([]);
  const pathname = usePathname();

  const fetchGetQuiz = async (id: any) => {
    const data = await GetQuiz(id);

    if (data) {
      setQuestions(data.props.repo.data[0].questions);
    }
  };

  /**
   * common
   */
  const splitPath = (url: string) => {
    const regex = /forms\/q\/e\/([^\/]+)\/viewform/;

    const match = url.match(regex);
    const slug = match ? match[1] : null;

    return slug;
  };

  useEffect(() => {
    let id = splitPath(pathname);
    console.log(id)
    fetchGetQuiz(id);
  }, []);

  return (
    <section className="col-span-12 xl:col-span-6 lg:col-span-8 md:col-span-10 sm:col-span-12 md:col-start-2 sm:col-start-0 lg:col-start-3 xl:col-start-4 col-start-1">
      {questions.map((item: Question, index: number) => {
        return <QuestionBox key={index} questions={item} />;
      })}
    </section>
  );
}
