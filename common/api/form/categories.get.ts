import axios from "axios";
import Cookies from 'js-cookie';

interface Category {
    id: number;
    name: string;
};

export const GetCategories = async (): Promise<{ props: { repo: Category[] } } | null> => {
    const authorization = Cookies.get('client_token');

    const res = await axios.get(`http://localhost:8000/categories`, {
        headers: { authorization }
    })
        .catch(function (error) {
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
