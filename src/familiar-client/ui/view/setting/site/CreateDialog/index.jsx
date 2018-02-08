import React        from "react"
import Button       from "react-material/ui/view/Button"
import Dialog       from "react-material/ui/view/Dialog"
import DialogHeader from "react-material/ui/view/DialogHeader"
import DialogBody   from "react-material/ui/view/DialogBody"
import DialogFooter from "react-material/ui/view/DialogFooter"
import TextField    from "react-material/ui/view/form/TextField"

import classNames from "familiar-client/ui/view/setting/site/CreateDialog/classNames"

export default ({
    create,
    className,
    onCancel = _ => undefined,
    ...props
}) =>
    <Dialog
        {...props}
    >
        <form
            autoComplete="off"
            className={className}
            onSubmit={async e => {
                e.preventDefault()

                let form = e.target

                await create({
                    enabled : true,
                    hostname: form.elements["hostname"].value,
                    notification:{
                        first_message_recieved:{
                            sound_id: "0"
                        },
                        message_recieved:{
                            sound_id: "0"
                        },
                        visited:{
                            sound_id: "0"
                        }
                    },
                    widget: {
                        colors: {
                            description: "#000000",
                            main: "#02a8f3",
                            visitor_message: {
                                text: "#000000",
                                background: "#ffffff",
                            },
                            subtitle: "#000000",
                            title: "#000000",
                            user_message: {
                                text: "#000000",
                                background: "#ffffff",
                            }
                        },
                        description: "",
                        image: "",
                        place: "bottom_right",
                        title: "",
                        subtitle: "",
                        offline_title: "",
                        offline_subtitle: "",
                        offline_description: "",
                        open_button: {
                            title: "",
                            description: ""
                        }
                    }
                })
            }}
        >
            <DialogHeader>
                サイト追加
            </DialogHeader>
            <DialogBody>
                <TextField
                    name="url"
                    labelText="/sample.html"
                    autoFocus={true}
                    required
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
