import React from "react"

import classNames from "familiar-client/ui/view/common/table/TableHead/classNames"

export default ({
    className,
    ...props
}) =>
    <thead
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    />
