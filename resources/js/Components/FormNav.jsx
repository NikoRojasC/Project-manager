import { UserPlusIcon } from "@heroicons/react/16/solid";
import { Link } from "@inertiajs/react";

export default function FormNav({ project, toUser }) {
    console.log(project);
    return (
        <>
            <div className="flex justify-between text-white mx-3 shadow-[0_10px_5px_-6px_rgba(15,23,42,0.62)]">
                <div className="flex">
                    <div
                        className={
                            "border-b-2 mx-1 my-2 px-2 pb-1 " +
                            (route().current("projects.edit")
                                ? "border-blue-500 text-blue-200"
                                : "")
                        }
                    >
                        <Link href={route("projects.edit", project)}>Info</Link>
                    </div>
                    <div
                        className={
                            "border-b-2 mx-1 my-2 px-2 pb-1 " +
                            (route().current("projects.edit.users")
                                ? "border-blue-500 text-blue-200"
                                : "") +
                            (project.role === 1 ? "" : " hidden")
                        }
                    >
                        <Link href={route("projects.edit.users", project)}>
                            Users
                        </Link>
                    </div>
                </div>
                {route().current("projects.edit.users") && (
                    <UserPlusIcon
                        onClick={toUser}
                        className="bg-blue-500 hover:bg-blue-600 cursor-pointer w-8 mx-4 my-2 px-2 py-1 rounded-lg"
                    />
                )}
            </div>
        </>
    );
}
