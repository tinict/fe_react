import axios from "axios";
import Cookies from "js-cookie";

interface Question {
    id: number;
    name: string;
    type: string;
    category_id: string;
    result: [];
    explain: string;
}

export const GetQuestion = async (
    category_id: string,
    question_id: string,
): Promise<{ props: { repo: Question } } | null> => {
    const authorization = Cookies.get("client_token");

    const res = await axios
        .get(`http://localhost:5000/api/v1/categories/${category_id}/questions/${question_id}/answer`)
        .catch((error) => {
            console.log(error);
        });

    if (!res) return null;

    const repo: Question = res.data;

    return {
        props: {
            repo,
        },
    };
};
