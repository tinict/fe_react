import { updateUserProfile } from "@/common/api/user/updateProfile";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Bio = ({ ...props }) => {

    const { data, onClose, onSave } = props;
    console.log("bio: ", data);
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

    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                <Textarea
                    label="Bio"
                    placeholder="Enter your description"
                    className="w-full"
                    defaultValue={editUser?.bio}
                    onChange={(e) => setEditUser({ ...editUser, bio: e.target.value })}
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
        </>
    );
};
