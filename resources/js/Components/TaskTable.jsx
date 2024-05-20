import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/Constants";
import SelectInput from "./SelectInput";
import TableHead from "./TableHead";
import TextInput from "./TextInput";
import { Link, router } from "@inertiajs/react";
import Pagination from "./Pagination";
import TableTextSelect from "./TableTextSelect";

export default function TaskTable({
    tasks,
    queryParams = null,
    project_id = null,
    uri = null,
    destroy,
}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(
            route(
                uri ? uri : "tasks.index",
                project_id ? [project_id, queryParams] : queryParams
            )
        );
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const SortChange = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_dir === "asc") {
                queryParams.sort_dir = "desc";
            } else {
                queryParams.sort_dir = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_dir = "asc";
        }
        console.log(queryParams);
        router.get(
            route(
                uri,
                [project_id, queryParams]
                // uri ? uri : "tasks.index",
                // project_id ? [project_id, queryParams] : queryParams
            )
        );
    };
    return (
        <>
            <div className="overflow-auto">
                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                        <tr className="font-semibold text-[0.95rem] text-gray-400 ">
                            <TableHead
                                sort={SortChange}
                                sort_dir={
                                    queryParams ? queryParams.sort_dir : ""
                                }
                                sort_field={
                                    queryParams ? queryParams.sort_field : ""
                                }
                                name="id"
                                classStyle="px-3 py-2 text-start"
                            >
                                ID
                            </TableHead>
                            <TableHead
                                sort={SortChange}
                                sort_dir={
                                    queryParams ? queryParams.sort_dir : ""
                                }
                                sort_field={
                                    queryParams ? queryParams.sort_field : ""
                                }
                                name="name"
                                classStyle="px-3 py-2 text-start"
                            >
                                Name
                            </TableHead>
                            <TableHead
                                sort={SortChange}
                                sort_dir={
                                    queryParams ? queryParams.sort_dir : ""
                                }
                                sort_field={
                                    queryParams ? queryParams.sort_field : ""
                                }
                                name="status"
                                classStyle="px-3 py-2 text-start"
                            >
                                Status
                            </TableHead>
                            <TableHead
                                sort={SortChange}
                                sort_dir={
                                    queryParams ? queryParams.sort_dir : ""
                                }
                                sort_field={
                                    queryParams ? queryParams.sort_field : ""
                                }
                                name="priority"
                                classStyle="px-3 py-2 text-start"
                            >
                                Priority
                            </TableHead>
                            <TableHead
                                sort={SortChange}
                                sort_dir={
                                    queryParams ? queryParams.sort_dir : ""
                                }
                                sort_field={
                                    queryParams ? queryParams.sort_field : ""
                                }
                                name="due_date"
                                classStyle="px-3 py-2 text-start"
                            >
                                Due Date
                            </TableHead>
                            <TableHead
                                sort={SortChange}
                                sort_dir={
                                    queryParams ? queryParams.sort_dir : ""
                                }
                                sort_field={
                                    queryParams ? queryParams.sort_field : ""
                                }
                                name="assigned_user"
                                classStyle="px-3 py-2 text-start"
                            >
                                Assigned to
                            </TableHead>
                            <TableHead
                                sort={SortChange}
                                sort_dir={
                                    queryParams ? queryParams.sort_dir : ""
                                }
                                sort_field={
                                    queryParams ? queryParams.sort_field : ""
                                }
                                name="created_at"
                                classStyle="px-3 py-2 text-start"
                            >
                                Created At
                            </TableHead>
                            <th className="px-3 py-2 text-start">Options</th>
                        </tr>
                    </thead>
                    <thead className="align-bottom">
                        <tr className="font-semibold text-[0.95rem] text-secondary-dark ">
                            <th className="px-3 py-2 text-start"></th>
                            <th className="px-3 py-2 text-start ">
                                <TextInput
                                    placeholder="Task Name"
                                    className="w-10/12"
                                    defaultValue={
                                        queryParams ? queryParams.name : ""
                                    }
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                            </th>
                            <th className="px-3 py-2 text-start">
                                <SelectInput
                                    className="w-10/12"
                                    defaultValue={
                                        queryParams ? queryParams.status : ""
                                    }
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-2 text-start"></th>
                            <th className="px-3 py-2 text-start"></th>
                            <th className="px-3 py-2 text-start"></th>
                            <th className="px-3 py-2 text-start"></th>
                            <th className="px-3 py-2 text-start"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map((task) => (
                            <tr
                                className="border-b border-solid last:border-b-0"
                                key={task.id}
                            >
                                <td className="px-3 py-2">{task.id}</td>
                                <td className="px-3 py-2 w-1/4">
                                    <p className="line-clamp-1">{task.name}</p>
                                </td>
                                <td className={"px-3 py-2 "}>
                                    <TableTextSelect
                                        campo="status"
                                        task={task}
                                    />
                                </td>
                                <td className={"px-3 py-2 "}>
                                    <TableTextSelect
                                        campo="priority"
                                        task={task}
                                    />
                                </td>
                                <td className="px-3 py-2">{task.due_date}</td>
                                <td className="px-3 py-2">
                                    {task.assignedUser.name}
                                </td>
                                <td className="px-3 py-2">{task.created_at}</td>
                                <td className="px-3 py-2">
                                    <Link
                                        className="px-2"
                                        href={route("tasks.edit", task)}
                                    >
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded-full">
                                            <i className="fa-regular fa-pen-to-square text-white"></i>
                                        </button>
                                    </Link>

                                    <button
                                        onClick={(e) => destroy(task)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded-full"
                                    >
                                        <i className="fa-solid fa-trash text-white"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links} />
        </>
    );
}
