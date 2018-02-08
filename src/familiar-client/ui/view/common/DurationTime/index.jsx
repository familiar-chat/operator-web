import React from "react"

export default ({
    className,
    component = "div",
    Component = component,
    connections = [],
    unitProps,
    ...props
}) => {
    let duration

    if(connections[0]) {
        let diff = new Date(new Date().getTime() - connections[0].connected_date)

        let second = Math.floor(diff / 1000)
        let minute = Math.floor(diff / (1000 * 60))
        let hour   = Math.floor(diff / (1000 * 60 * 60))
        let day    = Math.floor(diff / (1000 * 60 * 60 * 24))

        duration = day   ? [day, "日間"]
                : hour   ? [hour, "時間"]
                : minute ? [minute, "分間"]
                : second ? [second, "秒間"]
                : ["", ""]
    } else {
        duration = ["error", ""]
    }

    return (
        <Component
            className={className}
        >
            {duration[0]}
            <span
                {...unitProps}
            >
                {duration[1]}
            </span>
        </Component>
    )
}