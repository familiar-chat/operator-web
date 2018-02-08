import React      from "react"
import classNames from "familiar-client/ui/view/common/FontAwesomeIcon/classNames"

module.exports   = ({
    icon,
    children,
    className,
    component = "span",
    Component = component,
    ...props
}) =>
    <Component
        className={
            [
                classNames.Host,
                className
            ].join(" ")
        }
        {... props}
    >
        {icon}
        {children}
    </Component>
