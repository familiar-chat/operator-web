import React        from "react"
import Button       from "react-material/ui/view/Button"
import Dialog       from "react-material/ui/view/Dialog"
import DialogBody   from "react-material/ui/view/DialogBody"
import DialogFooter from "react-material/ui/view/DialogFooter"
import DialogHeader from "react-material/ui/view/DialogHeader"
import ImageInput   from "react-material/ui/view/form/ImageInput"
import TextField    from "react-material/ui/view/form/TextField"
import ViewPager    from "react-material/ui/view/ViewPager"

import classNames from "familiar-client/ui/view/iam/CreateDialog/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex: 0
        })
    }

    render() {
        let {
            create = user => undefined,
            onCancel = _ => undefined,
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

                        let form = e.target

                        await create({
                            displayName: form.elements["displayName"].value,
                            name       : form.elements["name"].value,
                            email      : form.elements["email"].value,
                            password   : form.elements["password"].value
                        })
                    }}
                >
                    <DialogHeader>
                        オペレーター 新規追加
                    </DialogHeader>
                    <ViewPager
                        selectedIndex={this.state.selectedIndex}
                    >
                        <div>
                            <DialogBody>
                                <TextField
                                    name="name"
                                    labelText="名前"
                                    required
                                />
                                <TextField
                                    name="displayName"
                                    labelText="表示名"
                                    required
                                />
                            </DialogBody>
                        </div>
                        <div>
                            <DialogBody>
                                <TextField
                                    name="email"
                                    labelText="メールアドレス"
                                    type="email"
                                    required
                                />
                                <TextField
                                    name="password"
                                    labelText="パスワード"
                                    type="password"
                                    onInput={e => {
                                        let form = e.target.form
                                        let password = form.elements["password"].value
                                        let passwordCheck = form.elements["passwordCheck"].value

                                        let passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)

                                        form.elements["password"].setCustomValidity(
                                            passwordRegex.test(form.elements["password"].value) ?  ""
                                          :                                                        "8文字以上で1文字以上の数字、小文字アルファベット、大文字アルファベットをそれぞれ含めてください。"
                                        )
                                        
                                        form.elements["passwordCheck"].setCustomValidity(
                                            newPassword == passwordCheck ? ""
                                          :                                "パスワードが一致しません。"
                                        )
                                    }}
                                    required
                                />
                                <TextField
                                    name="passwordCheck"
                                    labelText="パスワード(確認)"
                                    type="password"
                                    required
                                    onInput={e => {
                                        let form = e.target.form

                                        let password = form.elements["password"].value
                                        let passwordCheck = form.elements["passwordCheck"].value

                                        form.elements["passwordCheck"].setCustomValidity(
                                            password != passwordCheck ? "パスワードが一致しません。"
                                          :                             ""
                                        )
                                    }}
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
                                type="flat"
                                onClick={e => {
                                    this.setState({
                                        selectedIndex: 1
                                    })
                                }}
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