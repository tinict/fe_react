"use client";

import { useEffect, useState } from "react";
import { GetQuiz } from "@/common/api/form/quiz.get";
import Question from "./question";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

/**
 * Common
 */
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

export default function Page() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const pathname = usePathname();

    const fetchGetQuiz = async (id: any) => {
        const data = await GetQuiz(id);
        if (data) 
            setQuestions(data?.props?.repo?.questions);
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
        let id = splitPath(pathname)
        fetchGetQuiz(id);
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
