import React, { useEffect, useState } from 'react';
import EditBox from './editbox';
import { Input } from '@nextui-org/input';
import { PutQuestions } from '@/common/api/form/questions.put';
import { DeleteQuestions } from '@/common/api/form/questions.delete';
import { PostQuestions } from '@/common/api/form/questions.post';
import { v4 as uuidv4 } from 'uuid';

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

    const handleCreateQuestion = () => {
        const genId = uuidv4();
        setQuestions([
            ...questions,
            {
                id: genId,
                name: '',
                type: 'multiple-choice',
                category_id: idCategory
            }
        ]);

        console.log(questions);
        fetchCreateQuestion({
            id: genId,
            name: '',
            type: 'multiple-choice',
            category_id: idCategory
        });
    };

    const handleRemoveQuestion = (id: string) => {
        setQuestions(
            questions.filter(
                (question: Ques) => {
                    return question.id !== id;
                }
            )
        );

        fetchDeleteQuestion(id);
    };

    const fetchPutQuestion = async (id: string, question: any) => {
        await PutQuestions(id, question);
    };

    const fetchDeleteQuestion = async (id: string) => {
        await DeleteQuestions(id);
    };

    const fetchCreateQuestion = async (question: any) => {
        await PostQuestions(question);
    };

    return (
        <>
            {/* Box description default */}
            {/* <div
                className="group bg-white p-6 rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-full mb-[16px] relative"
            >
                <div
                    key={'underlined'}
                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                >
                    <Input
                        type="text"
                        variant={'underlined'}
                        label="Description"
                        placeholder="Enter your description"
                    />
                </div>
            </div> */}
            {(
                questions?.map((question: any, index: number) => {
                    return (
                        <EditBox
                            idQues={question?.id}
                            idCat={idCategory}
                            key={index}
                            ques={question}
                            newbox={handleCreateQuestion}
                            removebox={() => handleRemoveQuestion(question?.id)}
                            updateQuestion={fetchPutQuestion}
                        />
                    );
                })
            )}
        </>
    );
};

export default Question;
