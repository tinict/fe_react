"use client";

import React, { useEffect, useState } from 'react';
import { Card, Button, Avatar, Spacer } from '@nextui-org/react';
import AvatarBordered from '../avatars/bordered';
import { formatDate, formatFullName, formatGender, formatPhone } from '@/helpers/validate';

const ProfileBasic = ({ ...props }) => {
    console.log(props.profile);
    const { repo } = props.profile;

    return (
        <div>
            <Card className="w-full p-5 text-center shadow-md rounded-lg">
                <div className="flex justify-center mb-2.5">
                    <AvatarBordered
                        classAttribute={{
                            style: "w-36 h-36 rounded-full",
                        }}
                        urlPicture={repo?.picture}
                    />
                </div>

                <div className="px-4 py-6">
                    <div className="border-t border-gray-200 py-4">
                        <div className="flex justify-between py-2">
                            <span className="text-sm text-gray-500">FullName:</span>
                            <span>{formatFullName(repo?.firstname, repo?.lastname)}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-sm text-gray-500">Gender:</span>
                            <span>{formatGender(repo?.gender)}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-sm text-gray-500">Date of Birth:</span>
                            <span>{formatDate(repo?.dob)}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-sm text-gray-500">Phone:</span>
                            <span>{formatPhone(repo?.phone)}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-sm text-gray-500">Location:</span>
                            <span>Test</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-sm text-gray-500">Email:</span>
                            <span>{repo?.email}</span>
                        </div>
                        <div className="py-2">
                            <span className="text-sm text-gray-500">Bio:</span>
                            <p>
                                {repo?.bio}
                            </p>
                        </div>
                    </div>
                </div>

                <Button color="primary">Update Profile</Button>
            </Card>
        </div >
    );
};

export default ProfileBasic;
