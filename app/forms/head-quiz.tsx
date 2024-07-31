'use client';

import { faFolder, faEye, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { usePathname, useRouter } from 'next/navigation'

export const HeadQuiz = () => {
    const router  = useRouter();
    const pathname = usePathname();

    const splitPath = (url: string) => {
        const regex = /forms\/q\/([^\/]+)\/edit/;

        const match = url.match(regex);
        const slug = match ? match[1] : null;

        return slug;
    };

    const handleViewform = () => {
        router.push(`/forms/q/e/${splitPath(pathname)}/viewform`);
    };

    return (
        <>
            <header className="h-[60px] w-full flex items-center justify-between px-2">
                <div className="flex items-center space-x-4">
                    <div className="flex h-[22px] w-[22px] items-center justify-center">
                        <FontAwesomeIcon
                            icon={faFolder}
                            className="text-gray-700 w-ful h-full text-[blue] cursor-pointer"
                        />
                    </div>
                    <span>
                        <Input
                            type="text"
                            variant={'underlined'}
                            placeholder={'Template without title'}
                        />
                    </span>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex h-[22px] w-[22px] items-center justify-center">
                        <FontAwesomeIcon
                            icon={faLink}
                            className="text-gray-700 w-ful h-full text-[gray] cursor-pointer"
                        />
                    </div>
                    <div className="flex h-[22px] w-[22px] items-center justify-center">
                        <FontAwesomeIcon
                            onClick={handleViewform}
                            icon={faEye}
                            className="text-gray-700 w-ful h-full text-[gray] cursor-pointer"
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </div>
            </header>
        </>
    )
};