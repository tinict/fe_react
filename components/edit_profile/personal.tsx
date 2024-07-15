import { updateUserProfile } from "@/common/api/user/updateProfile";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toast } from "../toast";

export const PersonalProfile = ({ ...props }) => {

    const { data } = props;
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
                router.push('/profiles');
                alert("Updated Successfully!");
            })
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
                    defaultValue={editUser?.dob}
                    onChange={(e) => setEditUser({ ...editUser, dob: e.target.value })}
                />
                <Input
                    label="Phone"
                    defaultValue={editUser?.phone}
                    onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                />
                <Input
                    label="Location"
                    defaultValue={editUser?.location}
                    onChange={(e) => setEditUser({ ...editUser, location: e.target.value })}
                />
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
