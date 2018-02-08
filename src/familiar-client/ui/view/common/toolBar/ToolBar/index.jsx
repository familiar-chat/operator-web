import React  from "react"
import Shadow from "react-material/ui/effect/Shadow"

import classNames from "familiar-client/ui/view/common/toolBar/ToolBar/classNames"

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
