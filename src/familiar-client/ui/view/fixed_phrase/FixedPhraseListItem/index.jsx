import React      from "react"
import EditIconButton from "familiar-client/ui/view/common/EditIconButton"
import CheckBox   from "react-material/ui/view/CheckBox"
import TableRow   from "familiar-client/ui/view/common/table/TableRow"
import Switch     from "react-material/ui/view/Switch"

import classNames from "familiar-client/ui/view/fixed_phrase/FixedPhraseListItem/classNames"

export default ({
    className,
    fixedPhrase,
    onDisabled = _ => undefined,
    onEdit = _ => undefined,
    onEnabled = _ => undefined,
    onSelected = _ => undefined,
    selected,
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
                enabled={fixedPhrase.enabled}
                onClick={e => {
                    fixedPhrase.enabled ? onDisabled()
                  :                       onEnabled()
                }}
            />
        </td>
        <td>
            {fixedPhrase.name}
        </td>
        <td
            className={classNames.FixedPhraseWording}
        >
            <pre>
                {fixedPhrase.value}
            </pre>
        </td>
        <td>
            <EditIconButton
                onClick={onEdit}
            />
        </td>
    </TableRow>
