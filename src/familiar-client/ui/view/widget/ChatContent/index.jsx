import React             from "react"
import ReactDOM          from "react-dom"
import ImageSelectDialog from "familiar-client/ui/view/common/ImageSelectDialog"
import ChatPanel         from "familiar-client/ui/view/widget/ChatPanel"
import Log               from "familiar-client/ui/view/widget/Log"
import Shadow            from "react-material/ui/effect/Shadow"

import classNames from "familiar-client/ui/view/widget/ChatContent/classNames"

export default class extends React.Component {

    componentWillMount() {
        this.setState({
            sendImageDialogIsVisible: false
        })
    }

    componentDidMount() {
        let logElement       = ReactDOM.findDOMNode(this).children[0]
        logElement.scrollTop = logElement.scrollHeight
    }

    componentDidUpdate() {
        let logElement       = ReactDOM.findDOMNode(this).children[0]
        logElement.scrollTop = logElement.scrollHeight
    }

    render() {
        let {
            className,
            correspondingUserApi: {
                update: correspondingUserUpdate,
                delete: correspondingUserDelete,
                deleteOnDisconnect: correspondingUserDeleteOnDisconnect,
            },
            documentImageApi,
            getCurrentUserId = _ => undefined,
            organizationFixedPhrases = [],
            userFixedPhrases = [],
            user,
            visitor,
            visitorMessageApi,
            visitorReceivedMessageApi,
            visitorReceivedMessageImageApi,
            visitorTriggerMessageApi,
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
                <Log
                    connections={visitor && visitor.general.connections}
                    messages={visitor && visitor.general.messages}
                    receivedMessages={visitor && visitor.general.received_messages}
                    triggerMessages={visitor && visitor.general.trigger_messages}
                    visitorId={visitor && visitor.id}
                    visitorMessageApi={visitorMessageApi}
                    visitorReceivedMessageApi={visitorReceivedMessageApi}
                    visitorTriggerMessageApi={visitorTriggerMessageApi}
                />
                <Shadow
                    position="top"
                >
                    <ChatPanel
                        user={user}
                        visitor={visitor}
                        visitorReceivedMessageApi={visitorReceivedMessageApi}
                        sendMessage={_ => {
                            let logElement = ReactDOM.findDOMNode(this).children[0]
                            logElement.scrollTop = logElement.scrollHeight
                        }}
                        onFocus={async _ => {
                            await correspondingUserUpdate({
                                visitor: {
                                    id: visitor.id
                                },
                                corresponding_user: {
                                    id: getCurrentUserId(),
                                    start_date: new Date().getTime()
                                }
                            })
                            await correspondingUserDeleteOnDisconnect({
                                visitor: {
                                    id: visitor.id
                                },
                                corresponding_user: {
                                    id: getCurrentUserId()
                                }
                            })
                        }}
                        onBlur={async _ => {
                            await correspondingUserDelete({
                                visitor: {
                                    id: visitor.id
                                },
                                corresponding_user: {
                                    id: getCurrentUserId()
                                }
                            })
                        }}
                        onSendImageButtonClick={e => this.setState({sendImageDialogIsVisible: true})}
                        userFixedPhrases={userFixedPhrases}
                        organizationFixedPhrases={organizationFixedPhrases}
                    />
                </Shadow>
                <ImageSelectDialog
                    documentImageApi={documentImageApi}
                    visible={this.state.sendImageDialogIsVisible}
                    title="画像送信"
                    onCancel={_ =>
                        this.setState({sendImageDialogIsVisible: false})
                    }
                    onDocumentImageSend={async url => {
                        await visitorReceivedMessageImageApi.create({
                            imageUrl: url,
                            visitor: {
                                id: visitor.id
                            }
                        })
                        this.setState({sendImageDialogIsVisible: false})
                    }}
                    onNewImageSend={async image => {
                        await visitorReceivedMessageImageApi.create({
                            image,
                            visitor: {
                                id: visitor.id
                            }
                        })
                        this.setState({sendImageDialogIsVisible: false})
                    }}
                />
            </div>
        )
    }
}
