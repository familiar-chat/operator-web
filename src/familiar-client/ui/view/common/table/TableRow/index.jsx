import React from "react"

import classNames from "familiar-client/ui/view/common/table/TableRow/classNames"

export default ({
    className,
    ...props
}) =>
    <tr
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    />
