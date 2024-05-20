import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
} from "@/Constants";
import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import SelectInput from "./SelectInput";

export default function TableTextSelect({
    project = null,
    task = null,
    campo,
}) {
    // console.log(task);
    const [edit, setEdit] = useState(false);
    const { data, setData, post } = useForm({
        name: project ? project.name : task.name,
        status: project ? project.status : task.status,
        priority: task ? task.priority : null,
        assigned_user: task ? task.assignedUser.id : "",
        _method: "PUT",
    });

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [inputRef]);

    useEffect(() => {
        if (project) {
            if (data.status !== project.status)
                post(route("projects.update", project));
        } else {
            if (
                data.priority !== task.priority ||
                data.status !== task.status
            ) {
                // console.log(data);
                post(route("tasks.update", task));
            }
        }
    }, [data.status, data.priority]);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        setEdit(true);
    };
    const handleChange = (e) => {
        console.log(data);
        setData(campo, e.target.value);
        setEdit(false);
    };
    const handleBlur = () => {
        setEdit(false);
    };
    return (
        <>
            {edit ? (
                <SelectInput
                    // autofocus
                    ref={inputRef}
                    id={campo}
                    className={campo === "status" ? "!w-[115px]" : "!w-[85px]"}
                    value={campo === "status" ? data.status : data.priority}
                    onChange={(e) => handleChange(e)}
                    // onFocus={setEdit(true)}
                    onBlur={handleBlur}
                >
                    {campo === "status" ? (
                        <>
                            <option value="">Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </>
                    ) : (
                        <>
                            <option value="">Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </>
                    )}
                </SelectInput>
            ) : campo === "status" ? (
                <span
                    onClick={(e) => handleClick()}
                    className={
                        "py-1 px-2 rounded-lg " +
                        PROJECT_STATUS_CLASS_MAP[
                            project ? project.status : task.status
                        ]
                    }
                >
                    {
                        PROJECT_STATUS_TEXT_MAP[
                            project ? project.status : task.status
                        ]
                    }
                </span>
            ) : (
                <span
                    onClick={(e) => handleClick()}
                    className={
                        "py-1 px-2 rounded-lg " +
                        TASK_PRIORITY_CLASS_MAP[task.priority]
                    }
                >
                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                </span>
            )}
        </>
    );
}
