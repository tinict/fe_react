import React, { useEffect, useState } from 'react';
import EditBox from './editbox';
import { Input } from '@nextui-org/input';
import { PutQuestions } from '@/common/api/form/questions.put';
import { DeleteQuestions } from '@/common/api/form/questions.delete';

/**
 * Common
 */
interface Ques {
    id: number;
    name: string;
    type: string;
};

const Question = ({ ...props }) => {
    const { dataques } = props;
    const [questions, setQuestions] = useState<Ques[]>([]);

    useEffect(() => {
        setQuestions(dataques);
    }, [dataques]);

    const handleCreateQuestion = () => {
        const count: number = questions.length + 1;

        setQuestions([
            ...questions,
            {
                id: count,
                name: '',
                type: '',
            }
        ]);
    };

    const handleRemoveQuestion = (id: number) => {
        setQuestions(
            questions.filter(
                (question: Ques) => {
                    return question.id !== id;
                }
            )
        );

        fetchDeleteQuestion(id.toString());
    };

    const fetchPutQuestion = async (id: string, question: any) => {
        await PutQuestions(id, question);
    };

    const fetchDeleteQuestion = async (id: string) => {
        await DeleteQuestions(id);
    };

    return (
        <>
            {/* Box title default */}
            <div
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
            </div>
            {(
                questions?.map((question: any, index: number) => {
                    return (
                        <EditBox
                            idQues={question?.id}
                            key={index}
                            ques={question}
                            newbox={handleCreateQuestion}
                            removebox={() => handleRemoveQuestion(question?.id)}
                            updateQuestion={fetchPutQuestion}
                        />
                    );
                })
            )}
            {
                questions && (
                    <EditBox />
                )
            }
        </>
    );
};

export default Question;
