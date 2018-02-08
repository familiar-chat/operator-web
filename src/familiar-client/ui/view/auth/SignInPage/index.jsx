import React     from "react"
import CheckBox  from "react-material/ui/view/CheckBox"
import Button    from "react-material/ui/view/Button"
import Shadow    from "react-material/ui/effect/Shadow"
import TextField from "react-material/ui/view/form/TextField"

import classNames from "familiar-client/ui/view/auth/SignInPage/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            checkBoxIsSelected: false,
            isSending         : false,
        })
    }

    render() {
        let {
            onError = error => undefined,
            tokenApi: {
                create: create
            }
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                <div>
                    {/* left */}
                    <Shadow
                        blur="20"
                        offset="7"
                        position="right"
                    />
                    {/* left top */}
                    <Shadow
                        blur="20"
                        offset="7"
                        position="bottom"
                    />
                    {/* left bottom */}
                    <Shadow
                        blur="20"
                        offset="7"
                        position="top"
                    >
                        {/* triangle */}
                        <Shadow
                            blur="20"
                            offset="7"
                            position="top"
                        />
                    </Shadow>
                    {/* right */}
                    <Shadow
                        blur="20"
                        offset="7"
                        position="left"
                    />
                </div>
                <div>
                    <div
                        className={classNames.FamiliarLogo}
                    />
                    <Shadow
                        blur="5"
                        className={classNames.SignInShadow}
                        offset="5"
                    >
                        <form
                            autoComplete="off"
                            className={classNames.SignInForm}
                            onSubmit={async e => {
                                e.preventDefault()

                                this.setState({
                                    isSending: true
                                })

                                try {
                                    let form = e.target

                                    await create({
                                        email       : form.elements["email"].value,
                                        password    : form.elements["password"].value,
                                        staySignedIn: this.state.checkBoxIsSelected
                                    })
                                } catch (e) {
                                    onError(e)

                                    console.log(e)

                                    this.setState({
                                        isSending: false
                                    })
                                }
                            }}
                        >
                            <div>
                                <TextField
                                    name="email"
                                    labelText="メールアドレス"
                                    autoFocus={true}
                                    required
                                />
                                <TextField
                                    name="password"
                                    labelText="パスワード"
                                    type="password"
                                    required
                                />
                            </div>
                            <div>
                                <div
                                    className={classNames.SignInKeep}
                                >
                                    <CheckBox
                                        className={classNames.CheckBox}
                                        selected={this.state.checkBoxIsSelected}
                                        onClick={e =>
                                            this.setState({
                                                checkBoxIsSelected: !this.state.checkBoxIsSelected
                                            })
                                        }
                                    />
                                    ログイン状態を維持
                                </div>
                                <Button
                                    component="button"
                                    type="flat"
                                    disabled={this.state.isSending}
                                >
                                    ログイン
                                </Button>
                            </div>
                        </form>
                    </Shadow>
                </div>
            </div>
        )
    }
}


