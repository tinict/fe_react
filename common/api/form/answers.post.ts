import axios from "axios";
import Cookies from "js-cookie";

interface Answer {
  id: string;
  value: string;
  question_id: string;
}

export const PostAnswers = async (
  body: Answer,
): Promise<{ props: { repo: Answer[] } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .post(`http://localhost:8000/answers`, {
      ...body,
    })
    .catch((error) => {
      console.log(error);
    });

  if (!res) return null;

  const repo: Answer[] = res.data;

  return {
    props: {
      repo,
    },
  };
};
