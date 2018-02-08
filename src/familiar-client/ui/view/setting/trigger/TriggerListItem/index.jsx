import React      from "react"
import EditIconButton from "familiar-client/ui/view/common/EditIconButton"
import CheckBox   from "react-material/ui/view/CheckBox"
import TableRow   from "familiar-client/ui/view/common/table/TableRow"
import Switch     from "react-material/ui/view/Switch"

import classNames from "familiar-client/ui/view/setting/trigger/TriggerListItem/classNames"

export default ({
    className,
    onDisabled = e => undefined,
    onEdit = e => undefined,
    onEnabled = e => undefined,
    onSelected = e => undefined,
    selected = false,
    trigger,
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
            <Switch
                enabled={trigger.enabled}
                onClick={e => {
                    trigger.enabled ? onDisabled(e)
                  :                   onEnabled(e)
                }}
            />
        </td>
        <td>
            {trigger.name}
        </td>
        <td>
            {(trigger.conditions || []).map((x, i) =>
                <div
                    key={i}
                    className={classNames.Chip}
                >
                    {
                        x.type == "url"         ? "URL条件"
                      : x.type == "visit_count" ? "訪問回数条件"
                      : x.type == "message"     ? "訪問者発言条件"
                      : ""
                    }
                </div>
            )}
        </td>
        <td>
            {trigger.actions.map((x, i) =>
                <div
                    key={i}
                    className={classNames.Chip}
                >
                    {
                        x.type == "send_message"       ? "自動応答" 
                      : x.type == "send_image_message" ? "画像送信" 
                      :                                   ""
                    }
                </div>
            )}
        </td>
        <td>
            <EditIconButton
                onClick={onEdit}
            />
        </td>
    </TableRow>
