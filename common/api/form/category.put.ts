import axios from "axios";
import Cookies from 'js-cookie';

interface Category {
    id: string;
    name: string;
};

export const PutCategory = async (
    id: string,
    body: Category
): Promise<{ props: { repo: Category[] } } | null> => {
    const authorization = Cookies.get('client_token');

    const res = await axios.put(`http://localhost:8000/categories/${id}`, {
        ...body
    })
        .catch((error) => {
            console.log(error);
        });

    if (!res) return null;

    const repo: Category[] = res.data;

    return {
        props: {
            repo
        }
    };
};
