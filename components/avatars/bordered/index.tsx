'use client';

import React from "react";
import { Avatar } from "@nextui-org/react";

export default function AvatarBordered() {
    return (
        <div className="flex gap-4 items-center">
            <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        </div>
    );
}