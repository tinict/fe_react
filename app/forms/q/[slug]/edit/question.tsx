import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import EditBox from "./editbox";

import { PutQuestions } from "@/common/api/form/questions.put";
import { DeleteQuestions } from "@/common/api/form/questions.delete";
import { PostQuestions } from "@/common/api/form/questions.post";
import { GetQuestions } from "@/common/api/form/questions.get";
import toast from "react-hot-toast";

/**
 * Common
 */
interface Ques {
  id: string;
  name: string;
  type: string;
  category_id: string;
  results: [];
  explain: string;
};

const Question = ({ ...props }) => {
  const { idCategory, dataques } = props;
  const [questions, setQuestions] = useState<Ques[]>([]);

  /**
   * Fetch API Get questions / query with params: id
   * @param id
   */
  const fetchQueryQuestion = async () => {
    const data = await GetQuestions(idCategory);

    console.log(data, idCategory);
    if (data) setQuestions(data?.props?.repo.data);
  };

  const handleCreateQuestion = async () => {
    const genId = uuidv4();

    setQuestions([
      ...questions,
      {
        id: genId,
        name: "Quiz form without title",
        type: "multiple-choice",
        category_id: idCategory,
        results: [],
        explain: ""
      },
    ]);

    await fetchCreateQuestion({
      id: idCategory,
      name: "Quiz form without title",
      type: "multiple-choice",
      category_id: idCategory,
      results: [],
      explain: ""
    });

    fetchQueryQuestion();
  };

  useEffect(() => {
    setQuestions(dataques);
  }, [dataques]);

  const handleRemoveQuestion = async (id: string) => {
    setQuestions(
      questions.filter((question: Ques) => {
        return question.id !== id;
      }),
    );

    await fetchDeleteQuestion(idCategory, id)
      .then(() => {
        toast.success('Remove question success!');
      })
      .catch(() => {
        toast.error('Remove question failure!');
      })
  };

  const fetchPutQuestion = async (id: string, question: any) => {
    await PutQuestions(id, idCategory, question)
      .then(() => {
        toast.success('Update question success!');
      })
      .catch(() => {
        toast.error('Update question failure!');
      })
  };

  const fetchDeleteQuestion = async (category_id: string, question_id: string) => {
    await DeleteQuestions(category_id, question_id);
  };

  const fetchCreateQuestion = async (question: any) => {
    console.log(question);
    await PostQuestions(question);
  };

  return (
    <>
      {questions?.map((question: any, index: number) => {
        return (
          <EditBox
            key={index}
            idCat={idCategory}
            idQues={question?.id}
            newbox={() => handleCreateQuestion()}
            ques={question}
            removebox={() => handleRemoveQuestion(question?.id)}
            updateQuestion={fetchPutQuestion}
          />
        );
      })}
    </>
  );
};

export default Question;
