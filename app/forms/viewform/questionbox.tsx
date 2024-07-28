import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Radio, RadioGroup } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons';

const QuestionBox = ({ ...props }) => {
    const { questions } = props;

    const [selected, setSelected] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('M');
    const [checkAnswer, setCheckAnswer] = useState<Boolean | null>(null);
    const [isClearButton, setClearButton] = useState(false);
    const [isDoneButton, setDoneButton] = useState(false);
    const [isExplained, setExplained] = useState(false);

    const handleSelected = (item: any) => {
        setSelected(true);
        setSelectedAnswer(item.id);
        setClearButton(true);
        setDoneButton(true);
    };

    const handleClear = () => {
        setSelected(false);
        setSelectedAnswer('M');
    };

    const compareResult = () => {
        const { results } = questions;

        setCheckAnswer(results?.includes(selectedAnswer));
        setClearButton(false);
        setDoneButton(false);
        setExplained(true)
    };

    const getColor = () => {
        if (checkAnswer === null) {
            return 'primary';
        } else if (checkAnswer === true) {
            return 'success';
        } else {
            return 'danger';
        }
    };

    const handleDisableRadio = (id: any) => {
        if (id !== selectedAnswer) {
            if (checkAnswer || checkAnswer === false) return true;
        }
        else
            return false;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-full mb-[16px]">
            <fieldset className="space-y-4">
                <legend className="text-[16px] text-[rgb(32,33,36)] font-['docs-Roboto','Helvetica','Arial','sans-serif']">
                    {questions.name}
                </legend>
                <RadioGroup
                    orientation="vertical"
                    aria-label="shirt-size"
                    name="shirt-size"
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="space-y-2"
                >
                    {questions.answers.map((item: any, index: number) => (
                        <Radio
                            id={item.id}
                            value={item.id}
                            key={index}
                            onClick={() => handleSelected(item)}
                            color={getColor()}
                            isDisabled={handleDisableRadio(item.id)}
                        >
                            {item.value}
                        </Radio>
                    ))}
                </RadioGroup>
            </fieldset>
            {selected && (
                <div className="mt-4">
                    <div className="border-t border-gray-300 my-4"></div>
                    <div className="flex justify-end space-x-4">
                        {
                            isClearButton && (
                                <button
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                                    onClick={handleClear}
                                >
                                    Clear Selection
                                </button>
                            )
                        }
                        {
                            isDoneButton && (
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                                    onClick={compareResult}
                                >
                                    Done
                                </button>
                            )
                        }
                        {
                            isExplained && (
                                <Card className="py-2 w-full shadow-none">
                                    <CardHeader className="flex items-start p-2 space-x-2">
                                        <FontAwesomeIcon icon={faCheckToSlot} className="text-gray-500 mb-2" />
                                        <p className="text-xs uppercase font-bold text-gray-700">Explained</p>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2 px-4 text-gray-600">
                                        {questions.explain}
                                    </CardBody>
                                </Card>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionBox;
