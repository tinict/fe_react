'use client';

import { getUserProfile } from "@/common/api/user/profile.get";
import { ItemProfile } from "@/components/item_profile";
import { formatDate, formatGender } from "@/helpers/validate";
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
                    <h2>Basic Info</h2>
                    <ul>
                        <li>
                            <div>
                                <ItemProfile
                                    label={'FirstName'}
                                    content={{
                                        id: params.slug,
                                        root: editUser?.firstname,
                                        profile: editUser,
                                        type: 'firstname',
                                    }}
                                    onChange={(e: any) => setEditUser({ ...editUser, firstname: e.target.value })}
                                />
                                <ItemProfile
                                    label={'LastName'}
                                    content={{
                                        id: params.slug,
                                        root: editUser?.lastname,
                                        profile: editUser,
                                        type: 'lastname',
                                    }}
                                    onChange={(e: any) => setEditUser({ ...editUser, lastname: e.target.value })}
                                />
                            </div>
                        </li>
                        <li>
                            <ItemProfile
                                label={'Gender'}
                                content={{
                                    id: params.slug,
                                    root: formatGender(editUser?.gender),
                                    profile: editUser,
                                    type: 'gender',
                                }}
                                onChange={(e: any) => setEditUser({ ...editUser, gender: e.target.value })}
                            />
                        </li>
                        <li>
                            <ItemProfile
                                label={'Dob'}
                                content={{
                                    id: params.slug,
                                    root: formatDate(editUser?.dob),
                                    profile: editUser,
                                    type: 'dob',
                                }}
                                onChange={(e: any) => setEditUser({ ...editUser, dob: e.target.value })}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
