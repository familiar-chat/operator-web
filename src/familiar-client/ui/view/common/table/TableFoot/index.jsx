import React from "react"

import classNames from "familiar-client/ui/view/common/table/TableFoot/classNames"

export default ({
    className,
    ...props
}) =>
    <tfoot
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    />
