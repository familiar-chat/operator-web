import React          from "react"
import CheckBox       from "react-material/ui/view/CheckBox"
import TableRow       from "familiar-client/ui/view/common/table/TableRow"
import ListItemAvatar from "react-material/ui/view/ListItemAvatar"

import classNames from "familiar-client/ui/view/iam/UserListItem/classNames"

export default ({
    className,
    onEdited = e => undefined,
    onSelected = e => undefined,
    selected = false,
    user,
    ...props
}) =>
    <TableRow
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
    >
        <td>
            <CheckBox
                onClick={onSelected}
                selected={selected}
            />
        </td>
        <td>
            <ListItemAvatar
                className={classNames.Avatar}
                src={user.image}
            />
        </td>
        <td>
            {user.name}
        </td>
        <td>
            {user.display_name}
        </td>
        <td>
            {user.email}
        </td>
    </TableRow>
