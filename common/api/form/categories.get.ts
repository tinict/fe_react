import axios from "axios";
import Cookies from "js-cookie";

interface Category {
  id: string;
  name: string;
};

export const GetCategories = async (): Promise<{
  props: { repo: Category[] };
} | null> => {
  try {
    const authorization = Cookies.get("client_token");

    // if (!authorization) {
    //   console.error('Authorization token not found');
    //   return null;
    // }

    const res = await axios.get(`http://localhost:5000/api/v1/categories`, {
      headers: { authorization },
    });

    console.log(res.data);
    const repo: Category[] = res.data;

    return {
      props: {
        repo,
      },
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};

