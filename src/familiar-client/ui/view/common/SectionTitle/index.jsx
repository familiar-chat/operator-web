import React from "react"

import classNames from "familiar-client/ui/view/common/SectionTitle/classNames"

export default ({
    className,
    ...props
}) => 
    <h2
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    />