import axios from "axios";
import Cookies from 'js-cookie';

interface Answer {
    id: string;
    value: string,
    question_id: string;
};

export const PutAnswers = async (
    id: string,
    body: Answer
): Promise<{ props: { repo: Answer[] } } | null> => {
    const authorization = Cookies.get('client_token');

    const res = await axios.put(`http://localhost:8000/answers/${id}`, {
        ...body
    })
        .catch((error) => {
            console.log(error);
        });

    if (!res) return null;

    const repo: Answer[] = res.data;

    return {
        props: {
            repo
        }
    };
};
