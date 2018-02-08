import React              from "react"
import VisitorParameter   from "familiar-client/ui/view/widget/VisitorParameter"
import Navigator          from "familiar-client/ui/view/widget/Navigator"
import Button             from "react-material/ui/view/Button"
import ExpansionPanel     from "react-material/ui/view/ExpansionPanel"
import ExpansionPanelList from "react-material/ui/view/ExpansionPanelList"
import FlexibleSpace      from "react-material/ui/view/FlexibleSpace"
import LinearLayout       from "react-material/ui/view/LinearLayout"
import TextField          from "react-material/ui/view/form/TextField"

import classNames from "familiar-client/ui/view/widget/VisitorItems/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex: [],
        })
    }
    
    render() {
        let {
            className,
            component,
            Component = component,
            visitor,
            visitorApi: {
                update,
            },
            ...props
        } = this.props

        return (
            <Component
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
                        labelText="名前"
                        value={visitor && (visitor.name || visitor.general.name)}
                    >
                        <form
                            autoComplete="off"
                            onSubmit={async e => {
                                e.preventDefault()

                                await update({
                                    visitor:{
                                        id: visitor.id,
                                        name: e.target.elements["name"].value
                                    }
                                })

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                            className={classNames.Form}
                        >
                            <TextField
                                name="name"
                                autoFocus={true}
                                defaultValue={visitor && (visitor.name || visitor.general.name)}
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
                        labelText="情報"
                        value={visitor ? visitor.information : "未設定"}
                    >
                        <form
                            autoComplete="off"
                            onSubmit={async e => {
                                e.preventDefault()

                                await update({
                                    visitor:{
                                      id         : visitor.id,
                                      information: e.target.elements["information"].value
                                    }
                                })
                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                            className={classNames.Form}
                        >
                            <TextField
                                name="information"
                                autoFocus={true}
                                defaultValue={visitor && visitor.information}
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
                        labelText="email"
                        value={visitor ? visitor.email : "未設定"}
                    >
                        <form
                            autoComplete="off"
                            onSubmit={async e => {
                                e.preventDefault()

                                await update({
                                    visitor:{
                                      id: visitor.id,
                                      email: e.target.elements["email"].value
                                    }
                                })

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                            className={classNames.Form}
                        >
                            <TextField
                                name="email"
                                autoFocus={true}
                                defaultValue={visitor && visitor.email}
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
                        value={visitor ? visitor.phone : "未設定"}
                    >
                      <form
                          autoComplete="off"
                          onSubmit={async e => {
                              e.preventDefault()

                              await update({
                                  visitor:{
                                    id   : visitor.id,
                                    phone: e.target.elements["phone"].value
                                  }
                              })

                              this.setState({
                                  selectedIndex: undefined
                              })
                          }}
                        className={classNames.Form}
                      >
                        <TextField
                            name="phone"
                            autoFocus={true}
                            defaultValue={visitor && visitor.phone}
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
                <div>
                    <VisitorParameter
                        visitor={visitor}
                    />
                    <span className={classNames.Border}/>
                    <Navigator
                        navigator={visitor && visitor.general && visitor.general.navigator}
                    />
                </div>
            </Component>
        )
    }
}