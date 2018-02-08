import React        from "react"
import Button       from "react-material/ui/view/Button"
import Dialog       from "react-material/ui/view/Dialog"
import DialogHeader from "react-material/ui/view/DialogHeader"
import DialogBody   from "react-material/ui/view/DialogBody"
import DialogFooter from "react-material/ui/view/DialogFooter"
import ImageInput   from "react-material/ui/view/form/ImageInput"
import TextField    from "react-material/ui/view/form/TextField"
import ViewPager    from "react-material/ui/view/ViewPager"

import classNames from "familiar-client/ui/view/iam/EditDialog/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex: 0
        })
    }

    render() {
        let {
            onCancel = _ => undefined,
            update = user => undefined,
            user,
            ...props
        } = this.props

        return (
            <Dialog
                {...props}
            >
                <form
                    autoComplete="off"
                    onSubmit={async e => {
                        e.preventDefault()

                        await createUser({
                            image      : form.elements["image"].files,
                            name       : form.elements["name"].value,
                            displayName: form.elements["displayName"].value,
                            email      : form.elements["email"].value,
                            password   : form.elements["password"].value
                        })

                        this.setState({
                            selectedIndex: 0
                        })
                    }}
                >
                    <DialogHeader>
                        オペレーター 編集
                    </DialogHeader>
                    <ViewPager
                        selectedIndex={this.state.selectedIndex}
                    >
                        <div>
                            <DialogHeader>
                                オペレーター 編集
                            </DialogHeader>
                            <DialogBody>
                                <ImageInput
                                    className={classNames.ImageInput}
                                    labelText="オペレーター画像"
                                    name="image"
                                    placeholder="クリックして選択"
                                />
                                <TextField
                                    defaultValue={user && user.name}
                                    name="name"
                                    labelText="名前"
                                />
                                <TextField
                                    defaultValue={user && user.name}
                                    name="displayName"
                                    labelText="表示名"
                                />
                            </DialogBody>
                        </div>
                        <div>
                            <DialogBody>
                                <TextField
                                    defaultValue={user && user.email}
                                    labelText="メールアドレス"
                                    name="email"
                                    type="email"
                                />
                                <TextField
                                    defaultValue={user && user.password}
                                    labelText="パスワード"
                                    name="password"
                                    type="password"
                                />
                                <TextField
                                    defaultValue={user && user.password}
                                    labelText="パスワード(確認)"
                                    name="checkPassword"
                                    onInput={e => {
                                        let form = e.target.form
                                        let password           = form.elements["password"].value
                                        let checkPassword      = form.elements["checkPassword"].value
                                        let checkPasswordField = form.elements["checkPassword"]

                                        if (password != checkPassword)
                                            checkPasswordField.setCustomValidity("パスワードが一致しません。")
                                        else
                                            checkPasswordField.setCustomValidity("")
                                    }}
                                    type="password"
                                />
                            </DialogBody>
                        </div>
                    </ViewPager>
                    <ViewPager
                        selectedIndex={this.state.selectedIndex}
                    >
                        <DialogFooter>
                            <Button
                                type="flat"
                                onClick={e => {
                                    this.setState({
                                        selectedIndex: 0
                                    })

                                    onCancel()
                                }}
                            >
                                キャンセル
                            </Button>
                            <Button
                                onClick={e =>
                                    this.setState({
                                        selectedIndex: 1
                                    })
                                }
                                type="flat"
                            >
                                次へ
                            </Button>
                        </DialogFooter>
                        <DialogFooter>
                            <Button
                                type="flat"
                                onClick={e => {
                                    this.setState({
                                        selectedIndex: 0
                                    })

                                    onCancel()
                                }}
                            >
                                キャンセル
                            </Button>
                            <Button
                                type="flat"
                                onClick={e =>
                                    this.setState({
                                        selectedIndex: 0
                                    })
                                }
                            >
                                前へ
                            </Button>
                            <Button
                                component="button"
                                type="flat"
                            >
                                登録
                            </Button>
                        </DialogFooter>
                    </ViewPager>
                </form>
            </Dialog>
        )
    }
}