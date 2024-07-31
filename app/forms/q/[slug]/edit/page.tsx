"use client";

import { useEffect, useState } from "react";
import Question from "./question";
import { GetQuiz } from "@/common/api/form/quiz.get";

interface Answer {
    id: string;
    value: string;
};

interface Question {
    id: number;
    name: string;
    type: string;
    answers: Answer[];
    results: string[];
    explain: string;
};

interface Category {
    id: number;
    name: string;
    questions: Question[];
};

interface GetCategory {
    props?: {
        repo?: Category;
    };
};

export default function Page() {
    const [questions, setQuestions] = useState<Question[] | []>([]);

    const fetchGetQuiz = async (id: any) => {
        const data = await GetQuiz(id);

        if (data) {
            console.log(data);
            setQuestions(data.props.repo.questions)
        }
    };

    useEffect(() => {
        fetchGetQuiz('a3833e4f-dc0f-4fe9-9c76-038382dad0e7');
    }, []);

    return (
        <section className="w-[770px] pt-[12px]">
            {/* Box create/edit question */}
            <Question
                dataques={questions}
            />
        </section>
    );
};
