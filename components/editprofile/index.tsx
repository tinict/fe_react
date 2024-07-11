import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";
import AvatarBordered from "../avatars/bordered";
import { formatDate, formatFullName, formatGender, formatPhone } from "@/helpers/validate";

export default function EditProfile() {
    return (
        <Card className="max-w-[600px]">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md">Edit Profile Personal</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div>
                    <div className="flex justify-between py-2 items-center">
                        <span className="text-md text-gray-500">Avatar</span>
                        <Button color="primary">Edit</Button>
                    </div>
                    <div className="flex justify-center mb-2.5">
                        <AvatarBordered
                            classAttribute={{
                                style: "w-36 h-36 rounded-full",
                            }}
                        />
                    </div>
                </div>
                <Divider />
                <div className="flex justify-between py-2 items-center">
                    <span className="text-md text-gray-500">Personal Information</span>
                    <Button color="primary">Edit</Button>
                </div>
                <div className="px-4 py-6">
                    <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-500">FullName:</span>
                        <span>abc</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-500">Gender:</span>
                        <span>abc</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-500">Date of Birth:</span>
                        <span>abc</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-500">Phone:</span>
                        <span>abc</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-500">Location:</span>
                        <span>Test</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-500">Email:</span>
                        <span>abc</span>
                    </div>
                </div>
                <Divider />
                <div className="flex justify-between py-2 items-center">
                    <span className="text-md text-gray-500">Bio</span>
                    <Button color="primary">Edit</Button>
                </div>
                <div className="py-2">
                        <p>
                            Tiểu sử
                        </p>
                    </div>
            </CardBody>
        </Card>
    );
};
