import TextProject from "@/Components/TextProject";
import TaskTable from "@/Components/TaskTable";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Constants";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export default function Show({
    auth,
    project,
    tasks,
    queryParams = null,
    success,
}) {
    const [show, setShow] = useState(true);
    // console.log(tasks);
    queryParams = queryParams || {};

    useEffect(() => {
        setShow(true);

        if (success) {
            setTimeout(() => {
                setShow(false);
            }, 3000);
        }
    }, [success]);

    const destroy = (task = null) => {
        setShow(true);
        if (!window.confirm("Are you sure, you want to delete this")) return;

        if (task) {
            // console.log(task);
            router.delete(route("tasks.destroy", task));
            return;
        }

        router.delete(route("projects.destroy", project));
    };
    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Project "{project.name}"
                    </h2>
                    <div className="flex  justify-between w-20">
                        <PencilSquareIcon
                            onClick={(e) =>
                                router.get(route("projects.edit", project.id))
                            }
                            className="text-white bg-blue-500 px-2 py-1 w-9 rounded-lg cursor-pointer hover:bg-blue-600"
                        />
                        <TrashIcon
                            onClick={(e) => destroy()}
                            className="text-white bg-red-600 px-2 py-1 w-9 rounded-lg cursor-pointer hover:bg-red-700"
                        />
                    </div>
                </div>
            }
        >
            <Head title={"Projects " + project.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-around">
                                <img
                                    src={project.img_path}
                                    alt={project.name}
                                    className="w-1/3"
                                />
                                <div className="border-2 rounded-lg border-gray-700 py-2 px-5 w-2/3 mx-4 flex">
                                    <div className="w-1/3  ">
                                        <TextProject
                                            name="Created By"
                                            value={project.createdBy.name}
                                        />
                                        <TextProject
                                            name="Created At"
                                            value={project.created_at}
                                        />
                                        <TextProject
                                            name="Status"
                                            value={project.status}
                                            statusClass={
                                                PROJECT_STATUS_CLASS_MAP[
                                                    project.status
                                                ]
                                            }
                                            statusText={
                                                PROJECT_STATUS_TEXT_MAP[
                                                    project.status
                                                ]
                                            }
                                        />
                                        <TextProject
                                            name="Due Date"
                                            value={project.due_date}
                                        />
                                        <TextProject
                                            name="Last Updated By"
                                            value={project.updatedBy.name}
                                        />
                                    </div>
                                    <div className="w-2/3 ">
                                        <TextProject
                                            name="Description"
                                            value={project.description}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {success && show && (
                                <div className="bg-emerald-500 py-2 px-4 text-white w-full rounded-lg mt-3 mx-2">
                                    {success}
                                </div>
                            )}
                            <TaskTable
                                tasks={tasks}
                                queryParams={queryParams}
                                uri="projects.show"
                                project_id={project.id}
                                destroy={destroy}
                            ></TaskTable>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
