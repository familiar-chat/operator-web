import React from "react"

import classNames from "familiar-client/ui/view/common/FABSpace/classNames"

module.exports   = ({
    className,
    component = "div",
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
    />
