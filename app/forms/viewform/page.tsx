"use client";

import { useEffect, useState } from "react";
import QuestionBox from "./questionbox";
import { GetQuiz } from "@/common/api/form/quiz.get";

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


export default function Page() {
    const [questions, setQuestions] = useState<Question[] | []>([]);

    const fetchGetQuiz = async () => {
        const data = await GetQuiz();

        if (data) {
            console.log(data);
            setQuestions(data.props.repo.questions)
        }
    };

    useEffect(() => {
        fetchGetQuiz();
    }, []);

    return (
        <section className="w-[640px]">
            {
                questions.map((item: Question, index: number) => {
                    return (
                        <QuestionBox
                            key={index}
                            questions={item}
                        />
                    )
                })
            }
        </section>
    );
};
