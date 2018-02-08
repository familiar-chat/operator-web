import React from "react"

import classNames from "familiar-client/ui/view/common/table/TableBody/classNames"

export default ({
    className,
    ...props
}) =>
    <tbody
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    />
