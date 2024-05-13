import FormNav from "@/Components/FormNav";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function FormUsers({ auth, project = null, users, roles }) {
    // console.log(users);
    console.log(roles.data);

    const { data, setData, post, errors } = useForm({
        email: "",
    });

    const [showUser, setShowUser] = useState(false);
    const cancel = () => {
        router.get(route("projects.index"));
    };

    const toUser = () => {
        console.log(showUser);
        setShowUser(!showUser);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setShowUser(!showUser);
        setData("email", "");
        post(route("projects.edit.addUsers", project));
    };
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {project ? `Edit "${project.name}"` : "Create new Project"}
                </h2>
            }
        >
            <Head title={project ? project.name : "Create new Project"} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <FormNav project={project} toUser={toUser} />
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {showUser && (
                                <form
                                    className="mb-3 mt-1 "
                                    onSubmit={onSubmit}
                                >
                                    <div className="flex space-x-2">
                                        <label htmlFor="email">Email</label>
                                        <TextInput
                                            id="email"
                                            name="email"
                                            className="px-2 h-7"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <button type="submit">
                                            <PlusCircleIcon className="w-8 px-2 py-1 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg" />
                                        </button>
                                    </div>
                                </form>
                            )}

                            {users.data.map((u) => (
                                <p key={u.id}>
                                    {u.name} -{" "}
                                    {roles.data.map(
                                        (r) => r.id === u.role && r.name
                                    )}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
