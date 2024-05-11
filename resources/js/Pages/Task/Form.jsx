import FormComponent from "@/Components/FormComponent";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Form({ auth, task = null, project }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const { data, setData, post, errors } = useForm({
        assignTo: task ? task.assignedUser.name : "",
        image: "",
        image_path: task ? task.img_path : "",
        name: task ? task.name : "",
        status: task ? task.status : "",
        description: task ? task.description : "",
        due_date: task ? task.due_date : "",
        project_id: task ? task.project_id : project.id,
        _method: task ? "PUT" : "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (task) {
            post(route("tasks.update", task));
            return;
        }
        post(route("tasks.store"));
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
        router.get(route("projects.show", project.id));
    };
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {task ? `Edit "${task.name}"` : "Create new Task"}
                </h2>
            }
        >
            <Head title={task ? task.name : "Create new Task"} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <FormComponent
                                data={data}
                                changeImg={changeImg}
                                onSubmit={onSubmit}
                                setData={setData}
                                selectedImage={selectedImage}
                                cancel={cancel}
                                errors={errors}
                                isTask={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
