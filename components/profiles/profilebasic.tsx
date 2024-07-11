"use client";

import React, { useEffect, useState } from 'react';
import { Card, Button, Avatar, Spacer, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from '@nextui-org/react';
import AvatarBordered from '../avatars/bordered';
import { formatDate, formatFullName, formatGender, formatPhone } from '@/helpers/validate';
import EditProfile from '../editprofile';

const ProfileBasic = ({ ...props }) => {
    const { repo } = props.profile;
    const [statusEditProfile, setStatusEditProfile] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleEditProfile = () => {
        setStatusEditProfile(!statusEditProfile);
    };

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
                <div className="flex justify-center mb-2.5">
                    <Button
                        color="primary"
                        onClick={handleEditProfile}
                        onPress={onOpen}
                    >
                        Update Profile
                    </Button>
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
                    </div>
                </div>
                <div className="border-t border-gray-200 py-4">
                    <div className="py-2">
                        <span className="text-sm text-gray-500">Bio</span>
                        <p>
                            {repo?.bio}
                        </p>
                    </div>
                </div>
            </Card >

            {/* Component Card Edit Profile */}
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                size="2xl"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                className='w-[600px]'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <EditProfile />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    );
};

export default ProfileBasic;
