import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Radio, RadioGroup } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faClipboardList, faFloppyDisk, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { QueryAnswers } from '@/common/api/form/answers.query';
import { QueryCorrectAnswers } from '@/common/api/form/correct_answers.query';
import { PutAnswers } from '@/common/api/form/answers.put';
import { PutCorrectAnswers } from '@/common/api/form/correct_answers.put';
import { DeleteAnswers } from '@/common/api/form/answers.delete';

/**
 * Common
 */
interface Option {
    id: string,
    value: string,
};

interface CorrectAnswer {
    question_id: string,
    answer_id: string,
    explain: string,
    id: string,
};

const EditBox = ({ ...props }) => {
    const { ques, newbox, removebox, idQues, updateQuestion } = props;
    const [contentQues, setContentQuest] = useState<string>('');
    const [results, setResults] = useState<string>('');
    const [correctAnswers, setCorrectAnswers] = useState<CorrectAnswer[]>([]);
    const [explain, setExplain] = useState<string>('');
    const [options, setOptions] = useState<Option[]>([]);

    const fetchQueryAnswers = async (id: any) => {
        const data = await QueryAnswers({
            question_id: id
        });

        if (data)
            setOptions(data?.props?.repo);
    };

    const fetchQueryCorrectAnswers = async (question_id: string) => {
        const data = await QueryCorrectAnswers({
            question_id,
        });

        if (data) {
            const correct_answers = data?.props?.repo

            setCorrectAnswers(correct_answers);
            setResults(correct_answers[0]?.answer_id);
            setExplain(correct_answers[0]?.explain);
        }
    };

    const handleAddOption = () => {
        let count = options.length + 1;
        setOptions(
            [
                ...options,
                {
                    id: count.toString(),
                    value: ''
                }
            ]
        );
    };

    const fetchPutAnswers = async () => {
        options.forEach(async (option: any) => {
            await PutAnswers(option.id, option);
        })
    };

    const fetchPutCorrectAnswers = async () => {
        options.forEach(async (option: any) => {
            await PutAnswers(option.id, option);
        });

        PutCorrectAnswers(correctAnswers[0].id, {
            question_id: idQues,
            answer_id: results,
            explain
        });
    };

    const fetchDeleteAnswers = async (id: string) => {
        await DeleteAnswers(id);
    };

    const handleRemoveOption = (id: string) => {
        setOptions(
            options.filter(option => option.id !== id)
        );
        fetchDeleteAnswers(id);
    };

    const handleUpdateQuestion = (id: string, dataUpdate: any) => {
        updateQuestion(id, {
            ...ques,
            ...dataUpdate
        });
        fetchPutAnswers();
        fetchPutCorrectAnswers();
    };

    useEffect(() => {
        setContentQuest(ques?.name);

        if (idQues) {
            fetchQueryAnswers(idQues);
            fetchQueryCorrectAnswers(idQues);
        }

        setResults(correctAnswers[0]?.answer_id);
        setExplain(correctAnswers[0]?.explain);
    }, [removebox]);

    return (
        <div
            className="group bg-white p-6 rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-full mb-[16px] relative"
        >
            <div className="w-full flex gap-4 items-center">
                <div
                    key={'underlined'}
                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-[56px]"
                >
                    <Input
                        type="text"
                        variant={'underlined'}
                        label="Question"
                        value={contentQues}
                        onChange={(e) => {
                            setContentQuest(e.target.value)
                        }}
                    />
                </div>
                <div className='w-[215px]'>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="h-[48px] flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <svg
                                    className="mr-2 w-5 h-5 text-gray-400"
                                    fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <circle cx="12" cy="12" r="6" fill="currentColor"></circle>
                                </svg>
                                <span>Multiple-choice</span>
                                <svg
                                    className="-mr-1 ml-2 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.92l3.71-3.7a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem
                                key="Multiple-choice"
                            >
                                Multiple-choice
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className="mt-6 mb-4">
                <RadioGroup
                    orientation="vertical"
                    aria-label="shirt-size"
                    name="shirt-size"
                    className="space-y-2"
                    value={results}
                    onChange={(e) => setResults(e.target.value)}
                >
                    {
                        (
                            options?.map((option: any, index: number) => {
                                return (
                                    <div
                                        className="flex items-center w-full space-x-2"
                                        key={index}
                                    >
                                        <Radio
                                            id={option.id}
                                            value={option.id}
                                        >
                                        </Radio>
                                        <Input
                                            type="text"
                                            variant={'underlined'}
                                            label={`Option ${index + 1}`}
                                            value={option.value}
                                            onChange={(e) => {
                                                setOptions(
                                                    options.map(
                                                        (opt: any) => {
                                                            if (opt.id === option.id)
                                                                return {
                                                                    ...opt,
                                                                    value: e.target.value
                                                                };
                                                            return opt;
                                                        }
                                                    )
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
                                )
                            })
                        )
                    }
                </RadioGroup>
                <div className="flex items-center w-full space-x-4 mt-4">
                    <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <div className="flex-grow">
                        <button
                            color="primary"
                            className=''
                            onClick={handleAddOption}
                        >
                            Add option
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex items-center justify-between">
                <div>
                    <button className="mr-2 space-x-2 flex items-center">
                        <FontAwesomeIcon
                            icon={faClipboardList}
                            className="text-gray-500 text-xl"
                        />
                        <div
                            key={'underlined'}
                            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-[56px]"
                        >
                            <Input
                                type="text"
                                variant={'underlined'}
                                label="Explain"
                                value={explain}
                                className='w-[300px]'
                                onChange={(e) => setExplain(e.target.value)}
                            />
                        </div>
                    </button>
                </div>
                <div className='flex space-x-2'>
                    <button
                        className="mr-2"
                        onClick={() => handleUpdateQuestion(idQues, {
                            name: contentQues
                        })}
                    >
                        <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="text-gray-500 text-xl"
                        />
                    </button>
                    <button className="mr-2">
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="text-gray-500 text-xl"
                            onClick={removebox}
                        />
                    </button>
                </div>
            </div>
            <div
                className="opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center bg-white p-[2px] rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-[50px] mb-[16px] absolute right-[-68] top-0"
            >
                <span
                    className='h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer'
                    onClick={newbox}
                >
                    <FontAwesomeIcon
                        icon={faCirclePlus}
                        className="text-gray-500 text-xl"
                    />
                </span>
                <span
                    className='h-[36px] w-[36px] flex flex-column items-center justify-center cursor-pointer'
                    onClick={removebox}
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="text-gray-500 text-xl"
                    />
                </span>
            </div>
        </div>
    );
};

export default EditBox;
