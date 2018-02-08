import React              from "react"
import EditableAvatar     from "familiar-client/ui/view/common/EditableAvatar"
import SendImageDialog    from "familiar-client/ui/view/common/SendImageDialog"
import FABSpace           from "familiar-client/ui/view/common/FABSpace"
import Aside              from "react-material/ui/view/Aside"
import Button             from "react-material/ui/view/Button"
import ExpansionPanel     from "react-material/ui/view/ExpansionPanel"
import ExpansionPanelList from "react-material/ui/view/ExpansionPanelList"
import FlexibleSpace      from "react-material/ui/view/FlexibleSpace"
import LinearLayout       from "react-material/ui/view/LinearLayout"
import TextField          from "react-material/ui/view/form/TextField"

import classNames from "familiar-client/ui/view/user/UserManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex  : undefined,
            dialogIsVisible: false
        })
    }

    render() {
        let {
            credentialApi: {
                updatePassword
            },
            getUserId,
            user = {},
            userApi: {
                update: updateUser
            },
            userImageApi: {
                create: createUserImage
            },
            ...props
        } = this.props

        return (
            <div 
                className={classNames.Host}
                {...props}
            >
                <div>
                    <ExpansionPanelList
                        onSelected={({index}) => this.setState({
                            selectedIndex: index
                        })}
                        onUnselected={({index}) => this.setState({
                            selectedIndex: undefined
                        })}
                        selectedIndexes={
                            this.state.selectedIndex == undefined ? []
                          :                                         [this.state.selectedIndex]
                        }
                    >
                        <ExpansionPanel
                            labelText="オペレーター名"
                            value={user.name}
                        >
                            <form
                                autoComplete="off"
                                onSubmit={async e => {
                                    e.preventDefault()

                                    await updateUser({
                                        user: {
                                            id  : getUserId(),
                                            name: e.target.elements["name"].value
                                        }
                                    })
                                    this.setState({
                                        selectedIndex: undefined
                                    })
                                }}
                            >
                                <TextField
                                    name="name"
                                    autoFocus={true}
                                    defaultValue={user.name}
                                    required
                                />
                                <LinearLayout
                                    orientation="horizontal"
                                >
                                    <FlexibleSpace/>
                                    <Button
                                        component="button"
                                    >
                                        送信
                                    </Button>
                                </LinearLayout>
                            </form>
                        </ExpansionPanel>
                        <ExpansionPanel
                            labelText="表示名"
                            value={user.display_name}
                        >
                            <form
                                autoComplete="off"
                                onSubmit={async e => {
                                    e.preventDefault()

                                    await updateUser({
                                        user: {
                                            id  : getUserId(),
                                            display_name: e.target.elements["displayName"].value
                                        }
                                    })
                                    this.setState({
                                        selectedIndex: undefined
                                    })
                                }}
                            >
                                <TextField
                                    name="displayName"
                                    autoFocus={true}
                                    defaultValue={user.display_name}
                                    required
                                />
                                <LinearLayout
                                    orientation="horizontal"
                                >
                                    <FlexibleSpace/>
                                    <Button
                                        component="button"
                                    >
                                        送信
                                    </Button>
                                </LinearLayout>
                            </form>
                        </ExpansionPanel>
                        <ExpansionPanel
                            labelText="電話番号"
                            value={user.phone}
                        >
                            <form
                                autoComplete="off"
                                onSubmit={async e => {
                                    e.preventDefault()

                                    await updateUser({
                                        user: {
                                            id  : getUserId(),
                                            phone: e.target.elements["phone"].value
                                        }
                                    })
                                    this.setState({
                                        selectedIndex: undefined
                                    })
                                }}
                            >
                                <TextField
                                    name="phone"
                                    autoFocus={true}
                                    defaultValue={user.phone}
                                    required
                                />
                                <LinearLayout
                                    orientation="horizontal"
                                >
                                    <FlexibleSpace/>
                                    <Button
                                        component="button"
                                    >
                                        送信
                                    </Button>
                                </LinearLayout>
                            </form>
                        </ExpansionPanel>
                        <ExpansionPanel
                            labelText="パスワード変更"
                        >
                            <form
                                autoComplete="off"
                                onSubmit={async e => {
                                    e.preventDefault()
                                    await updatePassword({
                                        password   : e.target.elements["password"].value,
                                        newPassword: e.target.elements["newPassword"].value
                                    })

                                    this.setState({
                                        selectedIndex: undefined
                                    })
                                }}
                            >
                                <TextField
                                    name="password"
                                    labelText="現在のパスワード"
                                    type="password"
                                    autoFocus={true}
                                    required
                                />
                                <Aside>
                                    8文字以上で1文字以上の数字、小文字アルファベット、大文字アルファベットをそれぞれ含めてください。
                                </Aside>
                                <TextField
                                    name="newPassword"
                                    labelText="新しいパスワード"
                                    type="password"
                                    onInput={e => {
                                        let form = e.target.form
                                        let newPassword = form.elements["newPassword"].value
                                        let newPasswordCheck = form.elements["newPasswordCheck"].value

                                        let passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)

                                        form.elements["newPassword"].setCustomValidity(
                                            passwordRegex.test(form.elements["newPassword"].value) ?  ""
                                          :                                                        "8文字以上で1文字以上の数字、小文字アルファベット、大文字アルファベットをそれぞれ含めてください。"
                                        )
                                        
                                        form.elements["newPasswordCheck"].setCustomValidity(
                                            newPassword == newPasswordCheck ? ""
                                          :                                    "パスワードが一致しません。"
                                        )
                                    }}
                                    required
                                />
                                <TextField
                                    name="newPasswordCheck"
                                    labelText="新しいパスワード（確認）"
                                    type="password"
                                    required
                                    onInput={e => {
                                        let form = e.target.form

                                        let newPassword = form.elements["newPassword"].value
                                        let newPasswordCheck = form.elements["newPasswordCheck"].value

                                        form.elements["newPasswordCheck"].setCustomValidity(
                                            newPassword == newPasswordCheck ? ""
                                          :                                   "パスワードが一致しません。"
                                        )
                                    }}
                                />
                                <LinearLayout
                                    orientation="horizontal"
                                >
                                    <FlexibleSpace/>
                                    <Button
                                        component="button"
                                    >
                                        送信
                                    </Button>
                                </LinearLayout>
                            </form>
                        </ExpansionPanel>
                    </ExpansionPanelList>
                    <EditableAvatar
                        onClick={e =>
                            this.setState({
                                dialogIsVisible: true
                            })
                        }
                        src={user.image}
                    />
                </div>
                <FABSpace/>
                <SendImageDialog
                    visible={this.state.dialogIsVisible}
                    title="オペレーター画像　編集"
                    onCancel={_ =>
                        this.setState({dialogIsVisible: false})
                    }
                    onSubmit={async e => {
                        e.preventDefault()
                        let form  = e.target
                        let image = form.elements["image"].files
                        
                        await createUserImage({image})

                        this.setState({
                            dialogIsVisible: false
                        })
                    }}
                    name="image"
                />
            </div>
        )
    }
}
