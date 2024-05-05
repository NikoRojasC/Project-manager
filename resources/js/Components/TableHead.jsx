import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
export default function TableHead({
    name,
    children,
    classStyle,
    sort = () => {},
    sort_field = null,
    sort_dir = null,
}) {
    return (
        <th onClick={(e) => sort(name)}>
            <div
                className={
                    classStyle +
                    " flex items-center justify-between gap-1 cursor-pointer"
                }
            >
                {children}
                <div>
                    <ChevronUpIcon
                        className={
                            "w-4 " +
                            (sort_field === name && sort_dir === "asc"
                                ? "text-white"
                                : "")
                        }
                    />
                    <ChevronDownIcon
                        className={
                            "w-4 -mt-2 " +
                            (sort_field === name && sort_dir === "desc"
                                ? "text-white"
                                : "")
                        }
                    />
                </div>
            </div>
        </th>
    );
}
