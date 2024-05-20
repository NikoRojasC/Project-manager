import { useForm } from "@inertiajs/react";
import SelectInput from "./SelectInput";
import { useEffect } from "react";

export default function UserRole({ user, roles, project }) {
    const { data, setData, post } = useForm({
        user: user.id,
        rol: user.role,
        _method: "PUT",
    });
    useEffect(() => {
        if (data.rol !== user.role)
            post(route("projects.edit.modUsers", project));
    }, [data.rol]);

    const rolChange = (e) => {
        setData("rol", e.target.value);
        // post(route("projects.edit.modUsers", project));
    };
    return (
        <form className="mt-1">
            <span>{user.name}</span>
            <SelectInput
                value={data.rol}
                className="mx-2"
                onChange={(e) => rolChange(e)}
            >
                {roles.data.map((r) => (
                    <option key={r.id} value={r.id}>
                        {r.name}
                    </option>
                ))}
            </SelectInput>
        </form>
    );
}
