import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faClipboardList, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

const EditBox = ({ ...props }) => {
    const { ques, newbox, removebox } = props;
    const [count, setCount] = useState<number>(1);
    const [contentQues, setContentQuest] = useState<[]>([]);
    const [options, setOptions] = useState([
        {
            id: count,
            option: ''
        }
    ]);

    const handleAddOption = () => {
        setCount(count + 1);
        setOptions([...options, {
            id: count + 1,
            option: ''
        }]);
    };

    const handleRemoveOption = (id: number) => {
        setOptions(
            options.filter(option => option.id !== id)
        );
    };

    useEffect(() => {
        setContentQuest(ques);
        setOptions(ques.answers)
    }, []);

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
                        value={contentQues?.name}
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
                                Multiple-choice
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
                {
                    (
                        options.map((option: any, index: number) => {
                            return (
                                <div className="flex items-center w-full space-x-4" key={index}>
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
                                        <Input
                                            type="text"
                                            variant={'underlined'}
                                            label={`Option ${option.id}`}
                                            value={option.value}
                                            onChange={(e) => {
                                                const newOptions = options.map(opt =>
                                                    opt.id === option.id ? { ...opt, option: e.target.value } : opt
                                                );
                                                setOptions(newOptions);
                                            }}
                                        />
                                    </div>
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
                                label="Answers"
                                value={contentQues?.results}
                            />
                        </div>
                    </button>
                </div>
                <button className="mr-2">
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="text-gray-500 text-xl"
                        onClick={removebox}
                    />
                </button>
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
