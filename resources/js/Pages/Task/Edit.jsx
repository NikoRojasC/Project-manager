import SelectInput from "@/Components/SelectInput";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import TextProject from "@/Components/TextProject";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/Constants";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ auth, task }) {
    // console.log(task);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: task.name,
        img_path: task.img_path,
        assignedUserName: task.assignedUser.name,
        due_date: task.due_date,
        status: task.status,
        priority: task.priority,
        description: task.description,
    });

    const edit = () => {};

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
    };
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Task "{task.name}"
                </h2>
            }
        >
            <Head title={task.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={(e) => submit(e)}>
                                <div className="flex justify-around">
                                    <img
                                        src={task.img_path}
                                        alt={task.name}
                                        className="w-1/3"
                                    />
                                    <div className="border-2 rounded-lg border-gray-700 py-2 px-5 w-2/3 mx-4 ">
                                        <div className="flex">
                                            <div className="w-2/4 ">
                                                <div>
                                                    <span>Assigned to: </span>
                                                    <TextInput
                                                        className="mx-2"
                                                        id="assignedUserName"
                                                        name="assignedUserName"
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
                                                    <span>Due Date: </span>
                                                    <TextInput
                                                        className="mx-2"
                                                        value={data.due_date}
                                                        type="date"
                                                        name=""
                                                        onChange={(e) =>
                                                            setData(
                                                                "due_date",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <span>Status: </span>
                                                    <SelectInput
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
                                                <div>
                                                    <span>Priority: </span>
                                                    <SelectInput
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
                                                </div>
                                            </div>
                                            <div className="w-2/4 ">
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
                                        <div className="w-full  flex justify-center mt-4">
                                            <button
                                                onClick={(e) => {
                                                    edit(e);
                                                }}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded w-4/12"
                                            >
                                                save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
