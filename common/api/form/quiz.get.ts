import axios from "axios";
import Cookies from "js-cookie";

interface Answer {
  id: string;
  value: string;
}

interface Question {
  id: number;
  name: string;
  type: string;
  answers: Answer[];
  results: string[];
  explain: string;
}

interface Category {
  id: number;
  name: string;
  questions: Question[];
}

export const GetQuiz = async (
  id: string,
): Promise<{ props: { repo: Category } } | null> => {   
  const authorization = Cookies.get("client_token");

  const res = await axios
    .get(
      `http://localhost:5000/api/v1/category/${id}`,
      {
        headers: { authorization },
      },
    )
    .catch(function (error) {
      console.log(error);
    });

  if (!res) return null;

  const repo: Category = res.data;

  return {
    props: {
      repo,
    },
  };
};
