import FormComponent from "@/Components/FormComponent";
import FormNav from "@/Components/FormNav";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Form({ auth, project = null }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const { data, setData, post, errors } = useForm({
        createdBy: project ? project.createdBy.name : "",
        image: "",
        image_path: project ? project.img_path : "",
        name: project ? project.name : "",
        status: project ? project.status : "",
        description: project ? project.description : "",
        due_date: project ? project.due_date : "",
        prevLoc: localStorage.getItem("prevLocation"),
        _method: project ? "PUT" : "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (project) {
            post(route("projects.update", project));
            return;
        }
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
                    {project ? `Edit "${project.name}"` : "Create new Project"}
                </h2>
            }
        >
            <Head title={project ? project.name : "Create new Project"} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {project && <FormNav project={project} />}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <FormComponent
                                data={data}
                                changeImg={changeImg}
                                onSubmit={onSubmit}
                                setData={setData}
                                selectedImage={selectedImage}
                                cancel={cancel}
                                errors={errors}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
