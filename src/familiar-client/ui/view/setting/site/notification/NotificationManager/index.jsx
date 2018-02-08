import React              from "react"
import LabeledList        from "familiar-client/ui/view/common/LabeledList"
import LabeledItem        from "familiar-client/ui/view/common/LabeledItem"
import SoundDialog        from "familiar-client/ui/view/setting/site/notification/SoundDialog"
import Button             from "react-material/ui/view/Button"
import ExpansionPanel     from "react-material/ui/view/ExpansionPanel"
import ExpansionPanelList from "react-material/ui/view/ExpansionPanelList"
import FlexibleSpace      from "react-material/ui/view/FlexibleSpace"
import LinearLayout       from "react-material/ui/view/LinearLayout"

import classNames from "familiar-client/ui/view/setting/site/notification/NotificationManager/classNames"

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            soundType           : undefined,
            visited             : undefined,
            messageRecieved     : undefined,
            firstMessageRecieved: undefined,
            dialogIsVisible     : false
        })
    }

    render() {
        let {
            className,
            notification,
            sounds = [],
            update = notification => undefined,
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
                <div>
                    通知音設定
                </div>
                <form
                    autoComplete="off"
                    onSubmit={async e => {
                        e.preventDefault()
                        await update({
                            visited: {
                                sound_id: this.state.visited              ? sounds.find(s => s.id == this.state.visited.id).id
                                                                          : this.state.visited ? this.state.visited
                                                                                               : notification.visited.sound_id,
                            },
                            first_message_recieved: {
                                sound_id: this.state.firstMessageRecieved ? sounds.find(s => s.id == this.state.firstMessageRecieved.id).id
                                                                          : this.state.firstMessageRecieved ? this.state.firstMessageRecieved 
                                                                                                            : notification.first_message_recieved.sound_id,
                            },
                            message_recieved: {
                                sound_id: this.state.messageRecieved      ? sounds.find(s => s.id == this.state.messageRecieved.id).id
                                                                          : this.state.messageRecieved ? this.state.messageRecieved 
                                                                                                       : notification.message_recieved.sound_id,
                            }
                        })
                    }}
                >
                    <LabeledList>
                        <LabeledItem
                            component={Button}
                            label="訪問者通知音"
                            value={
                                (
                                    sounds.find(y => 
                                        this.state.visited ? y.id == this.state.visited.id
                                      :                      y.id == notification.visited.sound_id
                                    )
                                 || {}
                                ).title
                            }
                            onClick={e => 
                                this.setState({
                                    soundType      : "visited",
                                    dialogIsVisible: true,
                                })
                            }
                        />
                        <LabeledItem
                            component={Button}
                            label="初回メッセージ通知音"
                            value={
                                (
                                    sounds.find(y => 
                                        this.state.firstMessageRecieved ? y.id == this.state.firstMessageRecieved.id
                                      :                                   y.id == notification.first_message_recieved.sound_id
                                    )
                                 || {}
                                ).title
                            }
                            onClick={e => 
                                this.setState({
                                    soundType      : "firstMessageSound",
                                    dialogIsVisible: true,
                                })
                            }
                        />
                        <LabeledItem
                            component={Button}
                            label="メッセージ通知音"
                            value={
                                (
                                    sounds.find(y => 
                                        this.state.messageRecieved ? y.id == this.state.messageRecieved.id
                                      :                              y.id == notification.message_recieved.sound_id
                                    )
                                 || {}
                                ).title
                            }
                            onClick={e => 
                                this.setState({
                                    soundType      : "messageSound",
                                    dialogIsVisible: true,
                                })
                            }
                        />
                    </LabeledList>
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
                <SoundDialog
                    visible={this.state.dialogIsVisible}
                    sounds={sounds}
                    onCancel={e =>
                        this.setState({
                            dialogIsVisible: false
                        })
                    }
                    onSelect={s => {
                        this.setState({
                            dialogIsVisible: false
                        })
                        switch (this.state.soundType) {
                            case "visited":
                                this.setState({
                                    visited: s
                                })
                                break
                            case "firstMessageSound":
                                this.setState({
                                    firstMessageRecieved: s
                                })
                                break
                            case "messageSound":
                                this.setState({
                                    messageRecieved: s
                                })
                                break
                        }
                    }}
                />
            </div>
        )
    }
}