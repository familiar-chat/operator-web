import React from "react"

import classNames from "familiar-client/ui/view/common/table/Table/classNames"

export default ({
    className,
    ...props
}) =>
    <table
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    />

