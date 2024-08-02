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

export const GetQuiz = async (id: string): Promise<{ props: { repo: Category } } | null> => {
    const authorization = Cookies.get('client_token');

    const res = await axios.get(`https://api.mockfly.dev/mocks/2c27f58b-dd2a-48b3-abef-a457b719ee95/api/v1/forms/${id}`, {
        headers: { authorization }
    })
        .catch(function (error) {
            console.log(error);
        });

    if (!res) return null;

    const repo: Category = res.data;

    return {
        props: {
            repo
        }
    };
};
