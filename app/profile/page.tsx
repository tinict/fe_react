"use client";

import React, { useEffect, useState } from 'react';
import ProfileBasic from '@/components/profiles/profilebasic';
import { getProfile } from '@/common/api/sso/google/getProfile';

type GetProfile = {
    repo: {
        gender: string;
        dob: string;
        phone: string;
        location: string;
        email: string;
        bio: string;
        picture: string;
    };
};


const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState<GetProfile | {}>({});

    /**
     * Call get profile by api getProfile, using login sso with Google
     */
    const fetchProfile = async () => {
        const profile = await getProfile();
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

export default ProfilePage;
