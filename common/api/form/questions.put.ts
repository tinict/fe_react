import axios from "axios";
import Cookies from "js-cookie";

interface Question {
  id: number;
  name: string;
  type: string;
  category_id: string;
}

export const PutQuestions = async (
  id: string,
  category_id: string,
  body: Question,
): Promise<{ props: { repo: Question[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .put(`http://localhost:5000/api/v1/category/${category_id}/question/${id}`, {
      ...body,
    })
    .catch((error) => {
      console.log(error);
    });

  if (!res) return null;

  const repo: Question[] = res.data;

  return {
    props: {
      repo,
    },
  };
};
