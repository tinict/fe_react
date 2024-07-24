"use client";

import React, { useEffect, useState } from 'react';
import { getUserProfile } from '@/common/api/user/profile.get';
import { Button, Listbox, ListboxItem, ListboxSection, User } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

type GetUserProfile = {
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    gender: string,
    dob: string,
    phone: string,
    email: string,
    bio: string,
};

interface ProfileProps {
    params: {
        slug: string;
    };
};

export default function Page({ params }: ProfileProps) {
    const [userProfile, setUserProfile] = useState<GetUserProfile | {}>({});

    /** 
     * Call get profile by api getProfile, using login sso with Google
     */
    const fetchProfile = async () => {
        const profile = await getUserProfile({
            id: params.slug
        });
        if (profile) {
            console.log(profile);
            setUserProfile(profile?.props);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        // <section className="flex flex-col gap-4 py-8 md:py-10">
        //     <ProfileBasic profile={userProfile} slug={params.slug} />
        // </section>
        <>
            <section className='py-[33px]'>
                <User
                    as="button"
                    avatarProps={{
                        size: "lg",
                        isBordered: false,
                        src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                    }}
                    className="transition-transform"
                    description="@tonyreichert"
                    name="Tony Reichert"
                />
            </section>
            <section className='flex justify-between rounded-none'>
                <div className='w-[950px] bg-[#F8F9FAFF] h-[696px]'>
                    <div className='h-[76px] flex items-center py-[27px] px-[24px]'>
                        <FontAwesomeIcon
                            icon={faAddressCard}
                            className='color-[#171A1FFF] w-[24px] h-[24px]'
                        />
                        <h2 className='font-[Lexend] text-[20px] leading-[30px] font-bold text-[#171A1FFF] p-[12px]'>General Information</h2>
                    </div>
                    <div className="border-t border-gray-300"></div>
                    <div className='p-[24px]'>
                        <div className='flex items-center justify-between mb-[17px]'>
                            <h1 className='font-[Lexend] text-[18px] leading-[28px] font-semibold text-[#171A1FFF]'>
                                Personal Information
                            </h1>
                            <Button className='bg-[#F8F9FAFF] hover:bg-[#DEE1E6FF]'>
                                <FontAwesomeIcon className='color-[#171A1FFF]' icon={faPenToSquare} />
                                <span className='text-[#171A1FFF]'>Edit</span>
                            </Button>
                        </div>
                        <div className='flex'>
                            <div className='flex w-1/4 mr-32'>
                                <div className='w-full'>
                                    <ul className='font-[Lexend] text-[14px] text-[#686583] w-full'>
                                        <li className='flex items-center justify-between h-[24px]'>
                                            <span className='w-1/2'>Id Number</span>
                                            <span className="w-[100px] text-left">0001234567</span>
                                        </li>
                                        <li className='flex items-center justify-between h-[24px]'>
                                            <span className='w-1/2'>Phone</span>
                                            <span className="w-[100px] text-left">(719) 860-5684</span>
                                        </li>
                                        <li className="flex items-center justify-between h-[24px]">
                                            <span className='w-1/2'>Email</span>
                                            <span className="w-[100px] text-left">elizopez95@gmail.com</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='flex w-1/4 ml-32'>
                                <ul className='font-[Lexend] text-[14px] text-[#686583] w-full'>
                                    <li className='flex items-center justify-between h-[24px]'>
                                        <span className='w-1/2'>Birthday</span>
                                        <span className="w-[100px] text-left">May 15, 1995</span>
                                    </li>
                                    <li className='flex items-center justify-between h-[24px]'>
                                        <span className='w-1/2'>Gender</span>
                                        <span className="w-[100px] text-left">Female</span>
                                    </li>
                                    <li className="flex items-center justify-between h-[24px]">
                                        <span className='w-1/2'>Nationality</span>
                                        <span className="w-[100px] text-left">Viet Nam</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-300 my-8"></div>
                    </div>
                </div>
                <div className='w-[240px] h-[200px] bg-[#F8F9FA] rounded-none px-[24px] py-[32px]'>
                    <Listbox
                        aria-label="Actions"
                    >
                        <ListboxItem key="new">General Information</ListboxItem>
                    </Listbox>
                </div>
            </section>
        </>
    );
};
