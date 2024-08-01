import React, { useEffect, useState } from 'react';
import EditBox from './editbox';
import { Input } from '@nextui-org/input';

/**
 * Common
 */
interface Answer {
    id: string;
    value: string;
};

interface Ques {
    id: number;
    name: string;
    type: string;
    answers: Answer[];
    results: string[];
    explain: string;
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
                answers: [],
                explain: '',
                results: []
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
    };
    console.log(questions);

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
                questions.map((question: any, index: number) => {
                    return (
                        <EditBox
                            key={index}
                            ques={question}
                            newbox={handleCreateQuestion}
                            removebox={() => handleRemoveQuestion(question?.id)}
                        />
                    );
                })
            )}
        </>
    );
};

export default Question;
