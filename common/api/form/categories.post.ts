import axios from "axios";
import Cookies from "js-cookie";

interface Category {
  id: string;
  name: string;
}

export const PostCategories = async (
  body: Category,
): Promise<{ props: { repo: Category[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .post(`http://localhost:8000/categories`, {
      ...body,
    })
    .catch((error) => {
      console.log(error);
    });

  if (!res) return null;

  const repo: Category[] = res.data;

  return {
    props: {
      repo,
    },
  };
};
