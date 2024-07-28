import { updateUserProfile } from "@/common/api/user/updateProfile";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toast } from "../toast";
import { Radio, RadioGroup } from "@nextui-org/react";
import { formatDate } from "@/helpers/validate";

export const PersonalProfile = ({ ...props }) => {

    const { data, onClose, onSave } = props;
    const [editUser, setEditUser] = useState<any>(data);
    const router = useRouter();
    const [isToast, setToast] = useState(false);

    /**
     * Update profile
     * @param param0 
     */
    const handleUpdateProfile = async ({ ...props }) => {
        const { id, body } = props;

        await updateUserProfile({
            id,
            body
        })
            .then(() => {
                router.push(`/profile/${id}`);
                onSave({ ...editUser });
                onClose();
            })
    };

    const formatDateToYYYYMMDD = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                <Input
                    label="First Name"
                    defaultValue={editUser?.firstname}
                    onChange={(e) => setEditUser({ ...editUser, firstname: e.target.value })}
                />
                <Input
                    label="Last Name"
                    defaultValue={editUser?.lastname}
                    onChange={(e) => setEditUser({ ...editUser, lastname: e.target.value })}
                />
                <Input
                    label="Date of Birth"
                    type="date"
                    defaultValue={formatDateToYYYYMMDD(editUser?.dob)}
                    onChange={(e) => setEditUser({ ...editUser, dob: e.target.value })}
                />
                <Input
                    label="Phone"
                    defaultValue={editUser?.phone}
                    onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                />
                <div>
                    <span className="text-sm text-gray-500 py-4">Gender:</span>
                    <div>
                        <RadioGroup
                            defaultValue={editUser?.gender + ''}
                            onChange={(e) => setEditUser({ ...editUser, gender: e.target.value })}
                            className="flex flex-row"
                        >
                            <Radio value='1'>Male</Radio>
                            <Radio value='2'>Female</Radio>
                            <Radio value='3'>Other</Radio>
                        </RadioGroup>
                    </div>
                </div>
                <Input
                    label="Email"
                    type="email"
                    defaultValue={editUser?.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
            </div>
            <div className="p-2 flex justify-end">
                <Button
                    color="primary"
                    onClick={() => handleUpdateProfile({
                        id: editUser?.id,
                        body: { ...editUser }
                    })}
                >
                    Update
                </Button>
            </div>
            {/* {
                isToast && (
                    <Toast />
                )
            } */}
        </>
    );
};
