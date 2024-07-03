const columns = [
    { name: "NAME", uid: "name" },
    { name: "PHONE", uid: "phone" },
    { name: "DOB", uid: "dob" },
    { name: "GENDER", uid: "gender" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
];

const users = [
    {
        id: 1,
        name: "Tony Reichert",
        status: "active",
        dob: "18/08/2002",
        phone: "+84 123456784",
        gender: 1,
        description: "Software Engineer at ABC Corp.",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "Zoey Lang",
        status: "paused",
        dob: "18/08/2002",
        phone: "+84 123456784",
        gender: 2,
        description: "Project Manager at XYZ Ltd.",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
    },
    {
        id: 3,
        name: "Jane Fisher",
        status: "active",
        dob: "18/08/2002",
        phone: "+84 123456784",
        gender: 2,
        description: "UI/UX Designer at Design Studio.",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
    },
    {
        id: 4,
        name: "William Howard",
        status: "vacation",
        dob: "18/08/2002",
        phone: "+84 123456784",
        gender: 1,
        description: "Backend Developer at Tech Solutions.",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
    },
    {
        id: 5,
        name: "Kristen Copper",
        status: "active",
        dob: "18/08/2002",
        phone: "+84 123456784",
        gender: 2,
        description: "Frontend Developer at WebWorks.",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
];

export { columns, users, statusOptions };
