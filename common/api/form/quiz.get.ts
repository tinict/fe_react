import { ProfileGetMapper } from "@/mapping";
import axios from "axios";
import Cookies from 'js-cookie';

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

export const GetQuiz = async (): Promise<{ props: { repo: Category } } | null> => {
    const authorization = Cookies.get('client_token');

    const res = await axios.get(`https://api.mockfly.dev/mocks/2c27f58b-dd2a-48b3-abef-a457b719ee95/api/v1/forms/mathematics-category`, {
        headers: { authorization }
    })
        .catch(function (error) {
            console.log(error);
        });

    if (!res) return null;

    //Get Category
    console.log(res.data);
    const repo: Category = res.data;

    return {
        props: {
            repo
        }
    };
};
