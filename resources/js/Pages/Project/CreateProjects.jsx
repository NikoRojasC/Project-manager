import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CreateProjects({ auth }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const { data, setData, post, error, reset } = useForm({
        assignedUserName: "",
        image: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
    });
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("projects.store"));
    };

    const changeImg = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        const reader = new FileReader();

        reader.onload = (e) => {
            setSelectedImage(e.target.result); // URL of the uploaded image
        };

        reader.readAsDataURL(file);
    };
    const cancel = () => {
        router.get(route("projects.index"));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create new Project
                </h2>
            }
        >
            <Head title="New Project" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit} className="py-2 px-5">
                                <div className="flex justify-around">
                                    <div className="w-1/3">
                                        <InputLabel
                                            value="Project Image"
                                            htmlFor="project-img-path"
                                            className=""
                                        />
                                        <TextInput
                                            id="project-img-path"
                                            name="image"
                                            className="mt-2 block w-auto"
                                            type="file"
                                            onChange={changeImg}
                                        ></TextInput>
                                        {data.image && (
                                            <img
                                                src={selectedImage}
                                                className="w-2/3 mt-5 mx-auto"
                                            />
                                        )}
                                    </div>
                                    <div className=" py-2 px-5 w-2/3 mx-4 ">
                                        <div className="flex">
                                            <div className="w-1/2 ">
                                                <div>
                                                    <label htmlFor="assignedUserName">
                                                        Assigned to:
                                                    </label>
                                                    <TextInput
                                                        className="mx-2"
                                                        name="assignedUserName"
                                                        id="assignedUserName"
                                                        value={
                                                            data.assignedUserName
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "assignedUserName",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="due_date">
                                                        Due Date:
                                                    </label>
                                                    <TextInput
                                                        id="due_date"
                                                        className="mx-2"
                                                        value={data.due_date}
                                                        type="date"
                                                        name="due_date"
                                                        onChange={(e) =>
                                                            setData(
                                                                "due_date",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="status">
                                                        Status:
                                                    </label>
                                                    <SelectInput
                                                        id="status"
                                                        className="mx-2"
                                                        value={data.status}
                                                        onChange={(e) =>
                                                            setData(
                                                                "status",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Status
                                                        </option>
                                                        <option value="pending">
                                                            Pending
                                                        </option>
                                                        <option value="in_progress">
                                                            In Progress
                                                        </option>
                                                        <option value="completed">
                                                            Completed
                                                        </option>
                                                    </SelectInput>
                                                </div>
                                                {/* <div>
                                                    <label htmlFor="priority">
                                                        Priority:
                                                    </label>
                                                    <SelectInput
                                                        id="priority"
                                                        className="mx-2"
                                                        value={data.priority}
                                                        onChange={(e) =>
                                                            setData(
                                                                "priority",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Priority
                                                        </option>
                                                        <option value="low">
                                                            Low
                                                        </option>
                                                        <option value="medium">
                                                            Medium
                                                        </option>
                                                        <option value="high">
                                                            High
                                                        </option>
                                                    </SelectInput>
                                                </div> */}
                                            </div>
                                            <div className="w-1/2 ">
                                                <div>
                                                    <span>Name: </span>
                                                    <TextInput
                                                        value={data.name}
                                                        name="name"
                                                        className=" mx-2 w-4/6"
                                                        onChange={(e) =>
                                                            setData(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <span>Description</span>
                                                    <div>
                                                        <TextArea
                                                            onChange={(e) =>
                                                                setData(
                                                                    "description",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-full h-28"
                                                            value={
                                                                data.description
                                                            }
                                                            // style="form-sizing: content"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full  flex justify-center mt-4">
                                    <button
                                        type="button"
                                        onClick={cancel}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded w-2/12 mx-2"
                                    >
                                        cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded w-2/12 mx-2"
                                    >
                                        save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
