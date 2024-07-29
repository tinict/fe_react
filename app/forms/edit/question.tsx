import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Radio, RadioGroup, Switch } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckToSlot, faCircle, faCircleCheck, faCirclePlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import EditBox from './editbox';

const Question = () => {
    const [count, setCount] = useState<number>(1);
    const [questions, setQuestions] = useState([{
        id: 1,
        name: '',
        type: '',
    }]);

    const handleCreateQuestion = () => {
        setCount(count + 1);
        setQuestions([
            ...questions,
            {
                id: count + 1,
                name: "",
                type: "",
            }
        ])
    };

    const handleRemoveQuestion = (id: number) => {
        console.log('Remove box', id);
        setQuestions(questions.filter(question => id !== question.id));
    };

    return (
        <>
            {(
                questions.map((question: any, index: number) => {
                    return (
                        <EditBox
                            key={index}
                            newbox={handleCreateQuestion}
                            removebox={() => handleRemoveQuestion(question.id)}
                        />
                    );
                })
            )}
        </>
    );
};

export default Question;
