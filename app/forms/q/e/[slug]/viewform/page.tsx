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
      console.log(data);
      setQuestions(data.props.repo.questions);
    }
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

    fetchGetQuiz(id);
  }, []);

  return (
    <section className="w-[640px]">
      {questions.map((item: Question, index: number) => {
        return <QuestionBox key={index} questions={item} />;
      })}
    </section>
  );
}
