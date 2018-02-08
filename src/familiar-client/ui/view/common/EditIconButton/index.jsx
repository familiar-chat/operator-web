import React        from "react"
import IconToggle   from "react-material/ui/view/IconToggle"
import MaterialIcon from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/common/EditIconButton/classNames"

export default ({
    className,
    ...props
}) =>
    <IconToggle
        component={MaterialIcon}
        {...props}
    >
        mode_edit
    </IconToggle>
