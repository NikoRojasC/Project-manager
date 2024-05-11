import InputError from "./InputError";
import InputLabel from "./InputLabel";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

export default function FormComponent({
    data,
    changeImg,
    setData,
    selectedImage,
    cancel,
    onSubmit,
    errors,
    isTask,
}) {
    return (
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
                    <InputError message={errors.image} className="mt-2" />
                    {(data.image_path || data.image) && (
                        <img
                            src={data.image_path || selectedImage}
                            className="w-2/3 mt-5 mx-auto"
                        />
                    )}
                </div>
                <div className=" py-2 px-5 w-2/3 mx-4 ">
                    <div className="flex">
                        <div className="w-1/2 ">
                            {isTask && (
                                <div className="my-1">
                                    <label htmlFor="assignTo">Assign To:</label>
                                    <TextInput
                                        className="mx-2"
                                        name="assignTo"
                                        id="assignTo"
                                        value={data.assignTo}
                                        onChange={(e) =>
                                            setData("assignTo", e.target.value)
                                        }
                                    />
                                </div>
                            )}
                            <div className="my-1">
                                <label htmlFor="due_date">Due Date:</label>
                                <TextInput
                                    id="due_date"
                                    className="mx-2"
                                    value={data.due_date}
                                    type="date"
                                    name="due_date"
                                    onChange={(e) =>
                                        setData("due_date", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.due_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="my-1">
                                <label htmlFor="status">Status:</label>
                                <SelectInput
                                    id="status"
                                    className="mx-2"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="">Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                            {isTask && (
                                <div className="my-1">
                                    <label htmlFor="priority">Priority:</label>
                                    <SelectInput
                                        id="priority"
                                        className="mx-2"
                                        value={data.priority}
                                        onChange={(e) =>
                                            setData("priority", e.target.value)
                                        }
                                    >
                                        <option value="">Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                </div>
                            )}
                        </div>
                        <div className="w-1/2 ">
                            <div>
                                <span>Name: </span>
                                <TextInput
                                    value={data.name}
                                    name="name"
                                    className=" mx-2 w-4/6"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <span>Description</span>
                                <div>
                                    <TextArea
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="w-full h-28"
                                        value={data.description}
                                        // style="form-sizing: content"
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
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
    );
}
