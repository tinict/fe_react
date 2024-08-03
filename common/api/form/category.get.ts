import axios from "axios";
import Cookies from 'js-cookie';

interface Category {
    id: string;
    name: string;
};

export const GetCategory = async (
    id: string
): Promise<{ props: { repo: Category } } | null> => {
    const authorization = Cookies.get('client_token');

    const res = await axios.get(`http://localhost:8000/categories/${id}`, {
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