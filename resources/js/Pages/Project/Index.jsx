import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "../../Constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHead from "@/Components/TableHead";

export default function Index({ auth, projects, queryParams = null }) {
    queryParams = queryParams || {};
    console.log(queryParams);
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("projects.index", queryParams));
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const SortChange = (name) => {
        console.log(queryParams);
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
        router.get(route("projects.index", queryParams));
    };

    const Destroy = (id) => {
        router.get(route("projects.destroy", id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full my-0 align-middle text-dark border-neutral-200 ">
                                    <thead className="align-bottom">
                                        <tr className="font-semibold text-[0.95rem] text-gray-400 ">
                                            <TableHead
                                                sort={SortChange}
                                                sort_dir={
                                                    queryParams
                                                        ? queryParams.sort_dir
                                                        : ""
                                                }
                                                sort_field={
                                                    queryParams
                                                        ? queryParams.sort_field
                                                        : ""
                                                }
                                                name="id"
                                                classStyle="px-3 py-2 text-start"
                                            >
                                                ID
                                            </TableHead>
                                            <TableHead
                                                sort={SortChange}
                                                sort_dir={
                                                    queryParams
                                                        ? queryParams.sort_dir
                                                        : ""
                                                }
                                                sort_field={
                                                    queryParams
                                                        ? queryParams.sort_field
                                                        : ""
                                                }
                                                name="name"
                                                classStyle="px-3 py-2 text-start !w-[27rem]"
                                            >
                                                Name
                                            </TableHead>
                                            <TableHead
                                                sort={SortChange}
                                                sort_dir={
                                                    queryParams
                                                        ? queryParams.sort_dir
                                                        : ""
                                                }
                                                sort_field={
                                                    queryParams
                                                        ? queryParams.sort_field
                                                        : ""
                                                }
                                                name="status"
                                                classStyle="px-3 py-2 text-start"
                                            >
                                                Status
                                            </TableHead>
                                            <TableHead
                                                sort={SortChange}
                                                sort_dir={
                                                    queryParams
                                                        ? queryParams.sort_dir
                                                        : ""
                                                }
                                                sort_field={
                                                    queryParams
                                                        ? queryParams.sort_field
                                                        : ""
                                                }
                                                name="due_date"
                                                classStyle="px-3 py-2 text-start"
                                            >
                                                Due Date
                                            </TableHead>
                                            <TableHead
                                                sort={SortChange}
                                                sort_dir={
                                                    queryParams
                                                        ? queryParams.sort_dir
                                                        : ""
                                                }
                                                sort_field={
                                                    queryParams
                                                        ? queryParams.sort_field
                                                        : ""
                                                }
                                                name="createdBy"
                                                classStyle="px-3 py-2 text-start"
                                            >
                                                Created By
                                            </TableHead>
                                            <TableHead
                                                sort={SortChange}
                                                sort_dir={
                                                    queryParams
                                                        ? queryParams.sort_dir
                                                        : ""
                                                }
                                                sort_field={
                                                    queryParams
                                                        ? queryParams.sort_field
                                                        : ""
                                                }
                                                name="created_at"
                                                classStyle="px-3 py-2 text-start"
                                            >
                                                Created At
                                            </TableHead>
                                            <th className="px-3 py-2 text-start">
                                                Options
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="align-bottom">
                                        <tr className="font-semibold text-[0.95rem] text-secondary-dark ">
                                            <th className="px-3 py-2 text-start"></th>
                                            <th className="px-3 py-2 text-start !w-[27rem]">
                                                <TextInput
                                                    placeholder="Project Name"
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams
                                                            ? queryParams.name
                                                            : ""
                                                    }
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("name", e)
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-2 text-start">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams
                                                            ? queryParams.status
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
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
                                            </th>
                                            <th className="px-3 py-2 text-start"></th>
                                            <th className="px-3 py-2 text-start"></th>
                                            <th className="px-3 py-2 text-start"></th>
                                            <th className="px-3 py-2 text-start"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project) => (
                                            <tr
                                                className="border-b border-solid last:border-b-0"
                                                key={project.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {project.id}
                                                </td>
                                                <td className="px-3 py-2 text-wrap  truncate ">
                                                    <Link
                                                        href={route(
                                                            "projects.show",
                                                            project.id
                                                        )}
                                                        className="hover:underline cursor-pointer line-clamp-1"
                                                    >
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td className={"px-3 py-2 "}>
                                                    <span
                                                        className={
                                                            "py-1 px-2 rounded-lg " +
                                                            PROJECT_STATUS_CLASS_MAP[
                                                                project.status
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            PROJECT_STATUS_TEXT_MAP[
                                                                project.status
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.due_date}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.createdBy.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.created_at}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Link
                                                        className="px-2"
                                                        href={route(
                                                            "projects.edit",
                                                            project.id
                                                        )}
                                                    >
                                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded-full">
                                                            <i className="fa-regular fa-pen-to-square text-white"></i>
                                                        </button>
                                                    </Link>
                                                    <Link
                                                        className="px-2"
                                                        href={route(
                                                            "projects.destroy",
                                                            project.id
                                                        )}
                                                    >
                                                        <button
                                                            onClick={(e) =>
                                                                Destroy(
                                                                    project.id
                                                                )
                                                            }
                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded-full"
                                                        >
                                                            <i className="fa-solid fa-trash text-white"></i>
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
