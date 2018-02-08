import React              from "react"
import FABSpace           from "familiar-client/ui/view/common/FABSpace"
import Button             from "react-material/ui/view/Button"
import ExpansionPanel     from "react-material/ui/view/ExpansionPanel"
import ExpansionPanelList from "react-material/ui/view/ExpansionPanelList"
import FlexibleSpace      from "react-material/ui/view/FlexibleSpace"
import LinearLayout       from "react-material/ui/view/LinearLayout"
import TextField          from "react-material/ui/view/form/TextField"

import classNames from "familiar-client/ui/view/setting/organization/OrganizationManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            information  : undefined,
            selectedIndex: undefined
        })
    }

    componentDidMount() {
        ;(async _ => {
            let {
                organizationInformationApi: {
                    read,
                    subscribe
                }
            } = this.props

            let onChanged = information => this.setState({information})

            this.setState({
                subscribeCertificate: await subscribe({
                    subscriber: onChanged
                })
            })

            onChanged(await read())
        })()
    }

    componentWillUnmount() {
        let {
            organizationInformationApi: {
                unsubscribe: unsubscribe
            }
        } = this.props

        if (this.state.subscribeCertificate)
            unsubscribe(this.state.subscribeCertificate)
    }

    render() {
        let {
            className,
            organizationInformationApi: {
                update
            },
            ...props
        } = this.props

        return (
            <div
                className={
                    [
                        className,
                        classNames.Host
                    ].join(" ")
                }
                {...props}
            >
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
                        labelText="会社名"
                        value={this.state.information && this.state.information.name}
                    >
                        <form
                            autoComplete="off"
                            onSubmit={async e => {
                                e.preventDefault()

                                await update({
                                    information: {
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
                                defaultValue={this.state.information && this.state.information.name}
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
                        labelText="郵便番号"
                        value={this.state.information && this.state.information.zip_code}
                    >
                        <form
                            autoComplete="off"
                            onSubmit={async e => {
                                e.preventDefault()

                                await update({
                                    information: {
                                        zip_code: e.target.elements["zipCode"].value
                                    }
                                })
                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <TextField
                                name="zipCode"
                                autoFocus={true}
                                defaultValue={this.state.information && this.state.information.zip_code}
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
                        labelText="住所"
                        value={this.state.information && this.state.information.address}
                    >
                        <form
                            autoComplete="off"
                            onSubmit={async e => {
                                e.preventDefault()

                                await update({
                                    information: {
                                        address: e.target.elements["address"].value
                                    }
                                })

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <TextField
                                name="address"
                                autoFocus={true}
                                defaultValue={this.state.information && this.state.information.address}
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
                        value={this.state.information && this.state.information.phone}
                    >
                        <form
                            autoComplete="off"
                            onSubmit={async e => {
                                e.preventDefault()

                                await update({
                                    information: {
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
                            defaultValue={this.state.information && this.state.information.phone}
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
                        labelText="メールアドレス"
                        value={this.state.information && this.state.information.email}
                    >
                        <form
                            autoComplete="off"
                            onSubmit={async e => {
                                e.preventDefault()

                                await update({
                                    information: {
                                        email: e.target.elements["email"].value
                                    }
                                })
                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <TextField
                                name="email"
                                autoFocus={true}
                                defaultValue={this.state.information && this.state.information.email}
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
                </ExpansionPanelList>
                <FABSpace/>
            </div>
        )
    }
}