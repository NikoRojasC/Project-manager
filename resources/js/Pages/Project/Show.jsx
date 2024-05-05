import TextProject from "@/Components/TextProject";
import TaskTable from "@/Components/TaskTable";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Constants";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, project, tasks, queryParams }) {
    // console.log(tasks);
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Project "{project.name}"
                </h2>
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
                            <TaskTable
                                tasks={tasks}
                                queryParams={queryParams}
                                uri="projects.show"
                                project_id={project.id}
                            ></TaskTable>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
