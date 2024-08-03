import axios from "axios";
import Cookies from 'js-cookie';

interface Question {
    id: number;
    name: string;
    type: string;
};

export const PostQuestions = async (
    body: Question
): Promise<{ props: { repo: Question[] } } | null> => {
    const authorization = Cookies.get('client_token');

    const res = await axios.post(`http://localhost:8000/questions`, {
        ...body
    })
        .catch((error) => {
            console.log(error);
        });

    if (!res) return null;

    const repo: Question[] = res.data;

    return {
        props: {
            repo
        }
    };
};
