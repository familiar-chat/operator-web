import React  from "react"

import classNames from "familiar-client/ui/view/common/Anchor/classNames"

export default ({
    className,
    ...props
}) =>
    <a
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    />
