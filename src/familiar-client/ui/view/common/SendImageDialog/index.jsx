import React        from "react"
import Button       from "react-material/ui/view/Button"
import Dialog       from "react-material/ui/view/Dialog"
import DialogBody   from "react-material/ui/view/DialogBody"
import DialogFooter from "react-material/ui/view/DialogFooter"
import DialogHeader from "react-material/ui/view/DialogHeader"
import ImageInput   from "react-material/ui/view/form/ImageInput"

import classNames from "familiar-client/ui/view/common/SendImageDialog/classNames"

export default ({
    children,
    name,
    onCancel = e => undefined,
    title,
    ...props
}) =>
    <Dialog
        component="form"
        {...props}
    >
        <DialogHeader>
            {title}
        </DialogHeader>
        <DialogBody>
            <ImageInput
                className={classNames.ImageInput}
                labelText="クリックして選択"
                name={name}
                height="300"
                width="300"
            />
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
                送信
            </Button>
        </DialogFooter>
    </Dialog>
