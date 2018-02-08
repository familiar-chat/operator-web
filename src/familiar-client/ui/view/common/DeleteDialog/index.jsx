import React        from "react"
import Button       from "react-material/ui/view/Button"
import Dialog       from "react-material/ui/view/Dialog"
import DialogBody   from "react-material/ui/view/DialogBody"
import DialogFooter from "react-material/ui/view/DialogFooter"
import DialogHeader from "react-material/ui/view/DialogHeader"

export default ({
    children,
    onCancel = e => undefined,
    title,
    ...props
}) =>
    <Dialog
        component="form"
        onCancel={onCancel}
        {...props}
    >
        <DialogHeader>
            {title}
        </DialogHeader>
        <DialogBody>
            {children}
        </DialogBody>
        <DialogFooter>
            <Button
                type="flat"
                onClick={onCancel}
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
    </Dialog>
