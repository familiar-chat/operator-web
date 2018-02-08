import React     from "react"
import FABSpace  from "familiar-client/ui/view/common/FABSpace"
import Table     from "familiar-client/ui/view/common/table/Table"
import TableBody from "familiar-client/ui/view/common/table/TableBody"
import TableHead from "familiar-client/ui/view/common/table/TableHead"
import TableRow  from "familiar-client/ui/view/common/table/TableRow"
import CheckBox  from "react-material/ui/view/CheckBox"

import classNames from "familiar-client/ui/view/fixed_phrase/FixedPhraseList/classNames"

export default ({
    children,
    className,
    onAllSelecte = e => undefined,
    ...props
}) =>
    <Table
        className={
            [
                className, 
                classNames.Host
            ].join(" ")
        }
    >
        <TableHead>
            <TableRow
                className={classNames.Row}
            >
                <th>
                    <CheckBox
                        onClick={onAllSelecte}
                        selected={
                            React.Children.toArray(children).length > 0
                            && React.Children.toArray(children).every(x => x.props.selected)
                        }
                    />
                </th>
                <th>
                    状態
                </th>
                <th>
                    名称
                </th>
                <th>
                    定型文
                </th>
                <th>
                    編集
                </th>
            </TableRow>
        </TableHead>
        <TableBody>
            {children}
        </TableBody>
        <FABSpace
            component="tfoot"
        />
    </Table>