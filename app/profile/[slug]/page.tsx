"use client";

import React, { useEffect, useState } from 'react';
import ProfileBasic from '@/components/profiles/profilebasic';
import { getUserProfile } from '@/common/api/user/getUserProfile';

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
        <section className="flex flex-col gap-4 py-8 md:py-10">
            <ProfileBasic profile={userProfile} />
        </section>
    );
};
