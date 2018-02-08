import React         from "react"
import Button        from "react-material/ui/view/Button"
import Card          from "react-material/ui/view/Card"
import FlexibleSpace from "react-material/ui/view/FlexibleSpace"
import IconToggle    from "react-material/ui/view/IconToggle"
import MaterialIcon  from "react-material/ui/view/MaterialIcon"
import Radio         from "react-material/ui/view/Radio"
import TextField     from "react-material/ui/view/form/TextField"

import classNames   from "familiar-client/ui/view/setting/trigger/action/SendMessage/classNames"

export default ({
    action,
    className,
    component = Card,
    Component = component,
    onDelete = e => undefined,
    onMessageChange = text => undefined,
    onSecoundChange = secound => undefined,
    ...props
}) => 
    <Component
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    >
        <div>
            <div>
                自動応答
            </div>
            <hr/>
            <Button
                onClick={onDelete}
            >
                削除
            </Button>
        </div>
        <div>
            <TextField
                name="message"
                labelText="メッセージ"
                autoFocus={true}
                multiLine
                required
                defaultValue={action.value}
                onInput={e => onMessageChange(e.target.value)}
            />
            <TextField
                name="secound"
                labelText="秒数"
                autoFocus={true}
                defaultValue={action.secound}
                onInput={e => onSecoundChange(Number(e.target.value))}
                type="number"
                required
            />
        </div>
    </Component>