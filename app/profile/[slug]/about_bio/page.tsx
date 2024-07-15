'use client';

import { getUserProfile } from "@/common/api/user/profile.get";
import { ItemProfile } from "@/components/item_profile";
import { useEffect, useState } from "react";

//Re_API Profile[GET]
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
    const [userBio, setUserBio] = useState<string | null>(null);
    const [editUser, setEditUser] = useState<any>(null);

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
            setUserBio(profile?.props?.repo?.bio);
            setEditUser(profile?.props?.repo);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <>
            <div>
                <div>
                    <h2>Bio</h2>
                    <ItemProfile
                        label={'Bio'}
                        content={{
                            id: params.slug,
                            root: editUser?.bio,
                            profile: editUser,
                            type: 'bio',
                        }}
                        onChange={(e: any) => setEditUser({ ...editUser, bio: e.target.value })}
                    />
                </div>
            </div>
        </>
    );
};
