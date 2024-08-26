import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import EditBox from "./editbox";

import { PutQuestions } from "@/common/api/form/questions.put";
import { DeleteQuestions } from "@/common/api/form/questions.delete";
import { PostQuestions } from "@/common/api/form/questions.post";

/**
 * Common
 */
interface Ques {
  id: string;
  name: string;
  type: string;
  category_id: string;
};

const Question = ({ ...props }) => {
  const { idCategory, dataques } = props;
  const [questions, setQuestions] = useState<Ques[]>([]);

  useEffect(() => {
    setQuestions(dataques);
  }, [dataques]);

  const handleCreateQuestion = async () => {
    const genId = uuidv4();

    setQuestions([
      ...questions,
      {
        id: genId,
        name: "",
        type: "multiple-choice",
        category_id: idCategory,
      },
    ]);

    await fetchCreateQuestion({
      id: idCategory,
      name: "Quiz form without title",
      type: "multiple-choice",
      category_id: idCategory,
    });
  };

  const handleRemoveQuestion = async (id: string) => {
    setQuestions(
      questions.filter((question: Ques) => {
        return question.id !== id;
      }),
    );

    await fetchDeleteQuestion(idCategory, id);
  };

  const fetchPutQuestion = async (id: string, question: any) => {
    await PutQuestions(id, question);
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
