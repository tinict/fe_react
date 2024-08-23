import axios from "axios";
import Cookies from "js-cookie";

interface Question {
  id: number;
  name: string;
  type: string;
  category_id: string;
}

export const DeleteQuestions = async (
  id: string,
): Promise<{ props: { repo: Question[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .delete(`http://localhost:8000/questions/${id}`)
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
