import axios from "axios";
import Cookies from 'js-cookie';

interface Answer {
    id: string;
    value: string,
    question_id: string;
};

export const DeleteAnswers = async (
    id: string
): Promise<{ props: { repo: Answer[] } } | null> => {
    const authorization = Cookies.get('client_token');

    const res = await axios.delete(`http://localhost:8000/answers/${id}`)
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
