import React        from "react"
import ListItem     from "familiar-client/ui/view/common/list/ListItem"
import MaterialIcon from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/common/toolBar/ToolBarListItem/classNames"

export default ({
    children,
    className,
    icon,
    ...props
}) =>
    <ListItem
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    >
        <MaterialIcon
            className={classNames.ToolBarIcon}
        >
            {icon}
        </MaterialIcon>
        {children}
    </ListItem>
