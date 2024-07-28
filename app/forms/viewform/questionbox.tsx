import React from 'react';
import { Radio, RadioGroup } from '@nextui-org/react';

const QuestionBox = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] w-full mb-[16px]">
            <fieldset className="space-y-4">
                <legend
                    className="text-[16px] text-[rgb(32,33,36)] font-['docs-Roboto','Helvetica','Arial','sans-serif']"
                >
                    Kích thước áo
                </legend>
                <RadioGroup
                    orientation="vertical"
                    aria-label="shirt-size"
                    name="shirt-size"
                    defaultValue="M"
                    className="space-y-2"
                >
                    <Radio value="XS">XS</Radio>
                    <Radio value="S">S</Radio>
                    <Radio value="M">M</Radio>
                    <Radio value="L">L</Radio>
                    <Radio value="XL">XL</Radio>
                </RadioGroup>
            </fieldset>
        </div>
    );
};

export default QuestionBox;
