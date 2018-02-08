import React            from "react"
import Anchor           from "familiar-client/ui/view/common/Anchor"
import Button           from "react-material/ui/view/Button"
import Dialog           from "react-material/ui/view/Dialog"
import DialogBody       from "react-material/ui/view/DialogBody"
import FlexibleSpace    from "react-material/ui/view/FlexibleSpace"
import MaterialIcon     from "react-material/ui/view/MaterialIcon"
import IconToggle       from "react-material/ui/view/IconToggle"
import Image            from "react-material/ui/view/Image"

import classNames from "familiar-client/ui/view/common/ViewImageDialog/classNames"

export default ({
    src,
    onCancel = _ => undefined,
    ...props
}) => 
    <Dialog
        onCancel={onCancel}
        {...props}
    >
        <DialogBody>
            <Image
                src={src}
                width={600}
                height={600}
            />
            <div
                className={classNames.Operate}
            >
                <Button
                    onClick={e => onCancel()}
                >
                    閉じる
                </Button>
                <FlexibleSpace/>
                <Anchor
                    href={src}
                    download={src}
                >
                    <IconToggle>
                        <MaterialIcon>
                            file_download
                        </MaterialIcon>
                    </IconToggle>
                </Anchor>
            </div>
        </DialogBody>
    </Dialog>
