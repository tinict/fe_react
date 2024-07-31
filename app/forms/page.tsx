"use client";

import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetCategories } from "@/common/api/form/categories.get";

interface Category {
    id: number;
    name: string;
};

export default function Page() {
    const [categories, setCategories] = useState<Category[] | []>([]);

    const fetchGetCategories = async () => {
        const data = await GetCategories();

        if (data) {
            console.log(data);
            setCategories(data.props.repo)
        }
    };

    useEffect(() => {
        fetchGetCategories();
    }, []);

    return (
        <section className="w-full">
            <div className="p-4">
                <div className="h-[64px] flex items-center">
                    <h2 className="text-lg font-semibold text-blue-500">Start a new quiz</h2>
                </div>
                <div className="flex flex-wrap">
                    <div
                        className="mr-[19px] mb-[24px] cursor-pointer"
                    >
                        <div className="w-[171px] h-[128px] shadow-[rgba(0,0,0,0.16)_0px_1px_4px] flex flex-column items-center justify-center">
                            <div className="w-[100px] h-[100px] flex items-center justify-center">
                                <FontAwesomeIcon icon={faPlus} className="text-[50px] text-blue-500" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="text-[14px] text-gray-400">Create quiz blank</p>
                        </div>
                    </div>
                    {categories.map((category: any, index: number) => (
                        <div
                            key={index}
                            className="mr-[19px] mb-[24px] cursor-pointer"
                        >
                            <div className="w-[171px] h-[128px] shadow-[rgba(0,0,0,0.16)_0px_1px_4px] p-2 flex flex-column items-center justify-center">
                                <div className="h-[100px] w-[100px]">
                                    <img
                                        src="https://www.torontomu.ca/content/dam/google/teach-with-google-apps/quizzes-surveys/create-google-form/google-form.png"
                                        alt={category?.name}
                                        className="w-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-[14px] text-gray-400">{category?.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
