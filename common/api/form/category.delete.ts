import axios from "axios";
import Cookies from 'js-cookie';

interface Category {
    id: string;
    name: string;
};

export const deleteCategory = async (
    id: string
): Promise<{ props: { repo: Category[] } } | null> => {
    const authorization = Cookies.get('client_token');

    const res = await axios.delete(`http://localhost:8000/categories/${id}`)
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
