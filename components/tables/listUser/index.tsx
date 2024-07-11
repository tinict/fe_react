'use client';

import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
    getKeyValue
} from "@nextui-org/react";
import { EyeIcon } from "../../icons/EyeIcon";
import { EditIcon } from "../../icons/EditIcon";
import Search from "@/components/search";
import { formatDate, formatFullName, formatGender, formatPhone } from "@/helpers/validate";
import PaginationData from "@/components/pagination";
import { useRouter } from "next/navigation";

const columns = [
    { name: "NAME", uid: "name" },
    { name: "PHONE", uid: "phone" },
    { name: "DOB", uid: "dob" },
    { name: "GENDER", uid: "gender" },
    { name: "ADDRESS", uid: "address" },
    { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
];

const statusColorMap: any = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

export default function UserManager({ ...props }) {
    const { repo } = props.listProfile;
    const userProfile = repo?.list?.data || [];
    const router = useRouter();

    const handelShowProfile = (id: string) => {
        router.push(`/profile/${id}`);
    };

    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.picture }}
                        description={formatFullName(user.firstname, user.lastname)}
                        name={user.email}
                    >
                        {user.email}
                    </User>
                );
            case "phone":
                return formatPhone(user.phone);
            case "dob":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.dob]} size="sm" variant="flat">
                        {formatDate(cellValue)}
                    </Chip>
                );
            case "gender":
                return formatGender(user.gender);
            case "description":
                return cellValue;
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="flex text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon
                                    onClick={() => handelShowProfile(user.id)}
                                />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit">
                            <span className="flex text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <Search />
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={userProfile}>
                    {(item: any) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-center items-center">
                <PaginationData />
            </div>
        </>
    );
};
