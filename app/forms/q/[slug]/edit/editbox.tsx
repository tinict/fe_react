import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faClipboardList,
  faFloppyDisk,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

import { QueryAnswers } from "@/common/api/form/answers.query";
import { QueryCorrectAnswers } from "@/common/api/form/correct_answers.query";
import { PutCorrectAnswers } from "@/common/api/form/correct_answers.put";
import { PutAnswers } from "@/common/api/form/answers.put";
import { DeleteAnswers } from "@/common/api/form/answers.delete";
import { PostAnswers } from "@/common/api/form/answers.post";
import { GetAnswers } from "@/common/api/form/answers.get";
import { GetQuestion } from "@/common/api/form/question.get";

/**
 * Common
 */
interface Option {
  category_id: string;
  value: string;
  question_id: string;
};

interface CorrectAnswer {
  question_id: string;
  answer_id: string;
  explain: string;
  id: string;
};

const EditBox = ({ ...props }) => {
  const { ques, newbox, removebox, idQues, updateQuestion, idCat } = props;
  const [contentQues, setContentQuest] = useState<string>("");
  const [results, setResults] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState<any[]>([]);
  const [explain, setExplain] = useState<string>("");
  const [options, setOptions] = useState<any[]>([]);

  const fetchQueryAnswers = async (id_ques: string) => {
    const data = await fetchGetAnswers(idCat, id_ques);
    if (data) {
      setOptions(data?.props?.repo?.data);
    }
  };

  const setAnswerCorrect = (idCorrect: string) => {
    correctAnswers[0] = idCorrect;
    console.log(correctAnswers);
    setCorrectAnswers(correctAnswers);
  };

  const fetchQueryCorrectAnswers = async (id_ques: string) => {
    const data = await GetQuestion(idCat, id_ques);

    if (data) {
      const result = data?.props?.repo;

      // setCorrectAnswers(correct_answers);
      console.log(result);
      if (result.data && result.data.results && result.data.results.length > 0) {
        setResults(result.data.results[0]);
      }
      setExplain(result.data.explain);
    }
  };

  const handleAddOption = async () => {
    setOptions([
      ...options,
      {
        category_id: idCat,
        value: "",
        question_id: idQues,
      },
    ]);

    await fetchPostAnswers({
      category_id: idCat,
      question_id: idQues,
      value: "",
    })
      .then(async (res: any) => {
        const newData = res.props.repo;
        options.push(newData);
        setOptions(options);
      })
  };

  const fetchPutAnswers = async () => {
    options.forEach(async (option: any) => {
      await PutAnswers(option.id, idCat, idQues, option);
    });
  };

  // const fetchPutCorrectAnswers = async () => {
  //   options.forEach(async (option: any) => {
  //     await PutAnswers(option.id, option);
  //   });

  //   PutCorrectAnswers(correctAnswers[0].id, {
  //     question_id: idQues,
  //     answer_id: results,
  //     explain,
  //   });
  // };

  const fetchDeleteAnswers = async (id: string, category_id: string, question_id: string) => {
    await DeleteAnswers(id, category_id, question_id);
  };

  const fetchPostAnswers = async (data: any) => {
    return await PostAnswers(data);
  };

  const fetchGetAnswers = async (category_id: string, answer_id: string) => {
    return await GetAnswers(category_id, answer_id);
  };

  const handleRemoveOption = (id: string) => {
    setOptions(options.filter((option) => option?.id !== id));
    fetchDeleteAnswers(id, idCat, idQues);
  };

  const handleUpdateQuestion = (id: string, dataUpdate: any) => {
    updateQuestion(id, {
      ...ques,
      ...dataUpdate,
    });

    fetchPutAnswers();
    // fetchPutCorrectAnswers();
  };

  useEffect(() => {
    fetchGetAnswers(idCat, idQues);
    setContentQuest(ques?.name);

    if (idQues) {
      fetchQueryAnswers(idQues);
      fetchQueryCorrectAnswers(idQues);
    }

    // setResults(correctAnswers[0]?.answer_id);
    // setExplain(correctAnswers[0]?.explain);
  }, [removebox]);

  return (
    <>
      <div className="group bg-white p-6 rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-full mb-[16px] relative mt-4">
        <div className="w-full gap-4 items-center flex-nowrap md:flex">
          <div
            key={"underlined"}
            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-[56px]"
          >
            <Input
              label="Question"
              type="text"
              value={contentQues}
              variant={"underlined"}
              onChange={(e) => {
                setContentQuest(e.target.value);
              }}
            />
          </div>
          <div className="w-full">
            <Dropdown>
              <DropdownTrigger>
                <Button className="h-[48px] flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg
                    className="mr-2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" fill="currentColor" r="6" />
                  </svg>
                  <span>Multiple-choice</span>
                  <svg
                    aria-hidden="true"
                    className="-mr-1 ml-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.92l3.71-3.7a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                      fillRule="evenodd"
                    />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="Multiple-choice">Multiple-choice</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="mt-6 mb-4">
          <RadioGroup
            aria-label="shirt-size"
            className="space-y-2"
            name="shirt-size"
            orientation="vertical"
            value={results}
            onChange={(e) => setResults(e.target.value)}
          >
            {options?.map((option: any, index: number) => {
              return (
                <div key={index} className="flex items-center w-full space-x-2">
                  <Radio id={option.id} value={option.id} onClick={() => setAnswerCorrect(option.id)} />
                  <Input
                    label={`Option ${index + 1}`}
                    type="text"
                    value={option.value}
                    variant={"underlined"}
                    onChange={(e) => {
                      setOptions(
                        options.map((opt: any) => {
                          if (opt.id === option.id)
                            return {
                              ...opt,
                              value: e.target.value,
                            };

                          return opt;
                        }),
                      );
                    }}
                  />
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveOption(option.id)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              );
            })}
          </RadioGroup>
          <div className="flex items-center w-full space-x-4 mt-4">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            <div className="flex-grow">
              <button className="" color="primary" onClick={handleAddOption}>
                Add option
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4" />
        <div className="flex items-center justify-between">
          <div>
            <button className="mr-2 space-x-2 flex items-center">
              <FontAwesomeIcon
                className="text-gray-500 text-xl"
                icon={faClipboardList}
              />
              <div
                key={"underlined"}
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-[56px]"
              >
                <Input
                  className="w-full"
                  label="Explain"
                  type="text"
                  value={explain}
                  variant={"underlined"}
                  onChange={(e) => setExplain(e.target.value)}
                />
              </div>
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              className="mr-2"
              onClick={() =>
                handleUpdateQuestion(idQues, {
                  name: contentQues,
                  explain,
                  results: correctAnswers
                })
              }
            >
              <FontAwesomeIcon
                className="text-gray-500 text-xl"
                icon={faFloppyDisk}
              />
            </button>
            <button className="mr-2">
              <FontAwesomeIcon
                className="text-gray-500 text-xl"
                icon={faTrash}
                onClick={removebox}
              />
            </button>
          </div>
        </div>
        <div className="hidden md:flex opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center bg-white p-[2px] rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-[50px] mb-[16px] absolute right-[-68] top-0">
          <span
            className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer"
            onClick={newbox}
          >
            <FontAwesomeIcon
              className="text-gray-500 text-xl"
              icon={faCirclePlus}
            />
          </span>
          <span
            className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer"
            onClick={removebox}
          >
            <FontAwesomeIcon className="text-gray-500 text-xl" icon={faTrash} />
          </span>
        </div>

        <div className="fixed md:hidden bottom-0 left-0 w-full backdrop-blur-md bg-white/50 flex justify-center p-3 shadow-lg opacity-0 group-hover:opacity-100 z-10">
          <div className="flex justify-center items-center">
            <span
              className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer"
              onClick={newbox}
            >
              <FontAwesomeIcon className="text-[#2c31cf] text-xl" icon={faCirclePlus} />
            </span>
            <span
              className="h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer ml-4"
              onClick={removebox}
            >
              <FontAwesomeIcon className="text-[#2c31cf] text-xl" icon={faTrash} />
            </span>
          </div>
        </div>

      </div>
    </>
  );
};

export default EditBox;
