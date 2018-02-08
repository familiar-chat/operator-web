import React                  from "react"
import Switch                 from "react-material/ui/view/Switch"
import ActionSendMessage      from "familiar-client/ui/view/setting/trigger/action/SendMessage"
import ActionSendImageMessage from "familiar-client/ui/view/setting/trigger/action/SendImageMessage"
import ConditionUrl           from "familiar-client/ui/view/setting/trigger/condition/Url"
import ConditionVisitCount    from "familiar-client/ui/view/setting/trigger/condition/VisitCount"
import ConditionMessage       from "familiar-client/ui/view/setting/trigger/condition/Message"
import Button                 from "react-material/ui/view/Button"
import Dialog                 from "react-material/ui/view/Dialog"
import DialogBody             from "react-material/ui/view/DialogBody"
import DialogFooter           from "react-material/ui/view/DialogFooter"
import DialogHeader           from "react-material/ui/view/DialogHeader"
import FlexibleSpace          from "react-material/ui/view/FlexibleSpace"
import ListItem               from "react-material/ui/view/ListItem"
import MaterialIcon           from "react-material/ui/view/MaterialIcon"
import Menu                   from "react-material/ui/view/Menu"
import Radio                  from "react-material/ui/view/Radio"
import TextField              from "react-material/ui/view/form/TextField"

import classNames from "familiar-client/ui/view/setting/trigger/CreateDialog/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            conditionMenuIsVisible: false,
            actionMenuIsVisible   : false,
            triggerOperate        : "and",
            triggerEnabled        : true,
            conditions            : [],
            actions               : [],
        })
    }

    componentDidMount() {}

    render() {
        let {
            onCancel = _ => undefined,
            create = trigger => undefined,
            documentImages = [],
            ...props
        } = this.props

        return(
            <Dialog
                {...props}
                className={classNames.Host}
            >
                <form
                    autoComplete="off"
                    className={classNames.DialogForm}
                    onSubmit={async e => {
                        e.preventDefault()

                        let form = e.target
                        
                        await create({
                            name      : form.elements["name"].value,
                            conditions: this.state.conditions,
                            actions   : this.state.actions,
                            enabled   : this.state.triggerEnabled,
                            operate   : this.state.triggerOperate
                        })

                        this.setState({
                            conditionMenuIsVisible: false,
                            actionMenuIsVisible   : false,
                            triggerOperate             : "and",
                            triggerEnabled             : true,
                            conditions                 : [],
                            actions                    : [],
                        })
                    }}
                >
                    <DialogHeader>
                        トリガー 新規追加
                    </DialogHeader>
                    <DialogBody
                        className={classNames.DialogBody}
                    >
                        <div>
                            <TextField
                                className={classNames.Name}
                                name="name"
                                labelText="名称"
                                autoFocus={true}
                                required
                            />
                            <div>
                                無効
                                <Switch
                                    enabled={this.state.triggerEnabled}
                                    onClick={e => 
                                        this.setState({
                                            triggerEnabled: !this.state.triggerEnabled
                                        })
                                    }
                                />
                                有効
                            </div>
                        </div>
                        <div>
                            <div>
                                <div
                                    className={classNames.Title}
                                >
                                    <div>
                                        <MaterialIcon>
                                            assignment_late
                                        </MaterialIcon>
                                        条件
                                    </div>
                                    <div
                                        className={classNames.ConditionOperation}
                                    >
                                        <Button
                                            onClick={e =>
                                                this.setState({
                                                    conditionMenuIsVisible: true
                                                })
                                            }
                                        >
                                            条件を追加
                                        </Button>
                                        <FlexibleSpace/>
                                        <div>
                                            <Radio
                                                enabled={this.state.triggerOperate == "and"}
                                                onClick={e => this.setState({triggerOperate: "and"})}
                                            />
                                            全て一致
                                        </div>
                                        <div>
                                            <Radio
                                                enabled={this.state.triggerOperate == "or"}
                                                onClick={e => this.setState({triggerOperate: "or"})}
                                            />
                                            いずれか一致
                                        </div>
                                    </div>
                                    <Menu
                                        visible={this.state.conditionMenuIsVisible}
                                        onCancel={e =>
                                            this.setState({
                                                conditionMenuIsVisible: false
                                            })
                                        }
                                        className={classNames.Menu}
                                    >
                                        <ListItem
                                            onClick={e =>
                                                this.setState({
                                                    conditionMenuIsVisible: false,
                                                    conditions            : this.state.conditions
                                                        .concat({
                                                            type   : "url",
                                                            operate: "and",
                                                            values  : [{
                                                                match_condition: "perfect"
                                                            }]
                                                        })
                                                })
                                            }
                                        >
                                            URL
                                        </ListItem>
                                        <ListItem
                                            onClick={e =>
                                                this.setState({
                                                    conditionMenuIsVisible: false,
                                                    conditions            : this.state.conditions
                                                        .concat({
                                                            type   : "visit_count",
                                                            operate: "and",
                                                            values  : [{
                                                                match_condition: "equal"
                                                            }]
                                                        })
                                                })
                                            }
                                        >
                                            訪問回数
                                        </ListItem>
                                        <ListItem
                                            onClick={e =>
                                                this.setState({
                                                    conditionMenuIsVisible: false,
                                                    conditions            : this.state.conditions
                                                        .concat({
                                                            type   : "message",
                                                            operate: "and",
                                                            values  : [{
                                                                match_condition: "perfect"
                                                            }]
                                                        })
                                                })
                                            }
                                        >
                                            訪問者発言
                                        </ListItem>
                                    </Menu>
                                </div>
                                <div
                                    className={classNames.Condition}
                                >
                                    {this.state.conditions.map((condition, index) => 
                                        {
                                            let Component = condition.type == "url"         ? ConditionUrl
                                                          : condition.type == "visit_count" ? ConditionVisitCount
                                                          : condition.type == "message"     ? ConditionMessage
                                                          : <div/>

                                            return (
                                                <Component
                                                    key={index}
                                                    condition={condition}
                                                    onOperateChange={o => {
                                                        condition.operate = o
                                                        this.setState({
                                                            conditions: this.state.conditions.map((x, y) => 
                                                                y == index ? condition : x
                                                            )
                                                        })
                                                    }}
                                                    onValueChange={(u, i) => {
                                                        condition.values[i].value = u
                                                        this.setState({
                                                            conditions: this.state.conditions.map((x, y) => 
                                                                y == index ? condition : x
                                                            )
                                                        })
                                                    }}
                                                    onMatchConditionChange={(m, i) => {
                                                        condition.values[i].match_condition = m
                                                        this.setState({
                                                            conditions: this.state.conditions.map((x, y) => 
                                                                y == index ? condition : x
                                                            )
                                                        })
                                                    }}
                                                    onDelete={_ => this.setState({
                                                            conditions: this.state.conditions.filter((x, y) => 
                                                                y != index
                                                            )
                                                        })
                                                    }
                                                    onAddValue={_ => 
                                                        this.setState({
                                                            conditions: this.state.conditions.map((x, y) => {
                                                                if (y == index) {
                                                                    condition.values.push({
                                                                        match_condition: condition.type == "url"         ? "perfect"
                                                                                        : condition.type == "visit_count" ? "equal"
                                                                                        : condition.type == "message"     ? "perfect"
                                                                                        : ""
                                                                    })
                                                                    return condition
                                                                } else {
                                                                    return x
                                                                }
                                                            })
                                                        })
                                                    }
                                                    onDeleteValue={_ => 
                                                        this.setState({
                                                            conditions: this.state.conditions.map((x, y) => {
                                                                if (y == index) {
                                                                    condition.values = condition.values.filter((v, i) => i != y)
                                                                    return condition
                                                                } else {
                                                                    return x
                                                                }
                                                            })
                                                        })
                                                    }
                                                />
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                            <div>
                                <div
                                    className={classNames.Title}
                                >
                                    <div>
                                        <MaterialIcon>
                                            assignment_turned_in
                                        </MaterialIcon>
                                        アクション
                                    </div>
                                    <Button
                                        onClick={e =>
                                            this.setState({
                                                actionMenuIsVisible: true
                                            })
                                        }
                                    >
                                        アクションを追加
                                    </Button>
                                    <Menu
                                        visible={this.state.actionMenuIsVisible}
                                        onCancel={e =>
                                            this.setState({
                                                actionMenuIsVisible: false
                                            })
                                        }
                                        className={classNames.Menu}
                                    >
                                        <ListItem
                                            onClick={e =>
                                                this.setState({
                                                    actionMenuIsVisible: false,
                                                    actions            : this.state.actions
                                                        .concat({
                                                            type: "send_message"
                                                        })
                                                })
                                            }
                                        >
                                            自動応答
                                        </ListItem>
                                        <ListItem
                                            onClick={e =>
                                                this.setState({
                                                    actionMenuIsVisible: false,
                                                    actions            : this.state.actions
                                                        .concat({
                                                            type: "send_image_message"
                                                        })
                                                })
                                            }
                                        >
                                            画像送信
                                        </ListItem>
                                    </Menu>
                                </div>
                                <div
                                    className={classNames.Action}
                                >
                                    {this.state.actions.map((action, index) => 
                                        action.type == "send_message" ? 
                                            <ActionSendMessage
                                                key={"message" + index}
                                                action={action}
                                                onDelete={_ => this.setState({
                                                        actions: this.state.actions.filter((x, y) => 
                                                            y != index
                                                        )
                                                    })
                                                }
                                                onMessageChange={m => {
                                                    action.value = m
                                                    this.setState({
                                                        actions: this.state.actions.map((x, y) => 
                                                            y == index ? action : x
                                                        )
                                                    })
                                                }}
                                                onSecoundChange={s => {
                                                    action.secound = s
                                                    this.setState({
                                                        actions: this.state.actions.map((x, y) => 
                                                            y == index ? action : x
                                                        )
                                                    })
                                                }}
                                            />
                                      : action.type == "send_image_message" ? 
                                            <ActionSendImageMessage
                                                key={"image_message" + index}
                                                action={action}
                                                documentImages={documentImages}
                                                onDelete={_ => this.setState({
                                                        actions: this.state.actions.filter((x, y) => 
                                                            y != index
                                                        )
                                                    })
                                                }
                                                onImageChange={url => {
                                                    action.value = url
                                                    this.setState({
                                                        actions: this.state.actions.map((x, y) => 
                                                            y == index ? action : x
                                                        )
                                                    })
                                                }}
                                                onSecoundChange={s => {
                                                    action.secound = s
                                                    this.setState({
                                                        actions: this.state.actions.map((x, y) => 
                                                            y == index ? action : x
                                                        )
                                                    })
                                                }}
                                            />
                                      : null
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            onClick={e => {
                                this.setState({
                                    conditionMenuIsVisible: false,
                                    actionMenuIsVisible   : false,
                                    triggerOperate             : "and",
                                    triggerEnabled             : true,
                                    conditions                 : [],
                                    actions                    : [],
                                })
                                onCancel()
                            }}
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
        )
    }
}

    
