
import React  from "react"

import classNames from "familiar-client/ui/view/common/Page/classNames"

export default ({
    className,
    ...props
}) => 
    <div
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    />