export default function TextProject({
    name,
    value,
    statusClass = null,
    statusText = null,
}) {
    return (
        <div className="flex justify-start gap-2 mt-2">
            <span>{name}:</span>
            <span
                className={statusClass ? statusClass + " px-2 rounded-lg" : ""}
            >
                {statusText ? statusText : value}
            </span>
        </div>
    );
}
