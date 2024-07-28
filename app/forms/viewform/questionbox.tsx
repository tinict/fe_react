import React from 'react';
import { Radio, RadioGroup } from '@nextui-org/react';

const QuestionBox = ({ ...props }) => {
    const { questions } = props;

    return (
        <div
            className="bg-white p-6 rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-full mb-[16px]"
        >
            <fieldset className="space-y-4">
                <legend
                    className="text-[16px] text-[rgb(32,33,36)] font-['docs-Roboto','Helvetica','Arial','sans-serif']"
                >
                    {questions.name}
                </legend>
                <RadioGroup
                    orientation="vertical"
                    aria-label="shirt-size"
                    name="shirt-size"
                    defaultValue="M"
                    className="space-y-2"
                >
                    {(
                        questions.answers.map((item: any, index: number) => {
                            return (
                                <Radio value={item.id} key={index}>{item.value}</Radio>
                            )
                        })
                    )}
                </RadioGroup>
            </fieldset>
        </div>
    );
};

export default QuestionBox;
