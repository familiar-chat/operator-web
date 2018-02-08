import React        from "react"
import Button       from "react-material/ui/view/Button"
import Dialog       from "react-material/ui/view/Dialog"
import DialogBody   from "react-material/ui/view/DialogBody"
import DialogFooter from "react-material/ui/view/DialogFooter"
import DialogHeader from "react-material/ui/view/DialogHeader"
import TextField    from "react-material/ui/view/form/TextField"

import classNames from "familiar-client/ui/view/fixed_phrase/CreateDialog/classNames"

export default ({
    create = fixed_phrase => undefined,
    onCancel = _ => undefined,
    ...props
}) =>
    <Dialog
        {...props}
    >
        <form
            autoComplete="off"
            className={classNames.DialogForm}
            onSubmit={async e => {
                e.preventDefault()

                let form = e.target

                await create({
                    enabled: true,
                    name   : form.elements["name"].value,
                    value  : form.elements["value"].value
                })
            }}
        >
            <DialogHeader>
                定型文 新規追加
            </DialogHeader>
            <DialogBody>
                <TextField
                    name="name"
                    labelText="名称"
                    autoFocus={true}
                    required
                />
                <TextField
                    labelText="定型文"
                    name="value"
                    cols="40"
                    rows="4"
                    required
                    multiLine
                />
            </DialogBody>
            <DialogFooter>
                <Button
                    onClick={onCancel}
                    type="flat"
                >
                    キャンセル
                </Button>
                <Button
                    component="button"
                    type="flat"
                >
                    登録
                </Button>
            </DialogFooter>
        </form>
    </Dialog>
