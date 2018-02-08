import React                from "react"
import MessageInformation   from "familiar-client/ui/view/widget/MessageInformation"
import OperatorMessage      from "familiar-client/ui/view/widget/OperatorMessage"
import OperatorImageMessage from "familiar-client/ui/view/widget/OperatorImageMessage"
import VisitorMessage       from "familiar-client/ui/view/widget/VisitorMessage"
import VisitorImageMessage  from "familiar-client/ui/view/widget/VisitorImageMessage"
import MaterialIcon         from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/widget/Log/classNames"

export default ({
    className,
    component = "div",
    Component = component,
    connections = [],
    visitorId,
    visitorMessageApi,
    visitorReceivedMessageApi,
    visitorTriggerMessageApi,
    messages = [],
    receivedMessages = [],
    triggerMessages = [],
    ...props
}) => {
    let allMessage = (
        messages.map(x => {
            x._name = "visitor"
            return x
        })
        .concat(
            connections.map(x => {
                x._name = "connection"
                return x
            }),
            receivedMessages.map(x => {
                x._name = "operator"
                return x
            }),
            triggerMessages.map(x => {
                x._name = "trigger"
                return x
            })
        )
    )
        .sort((a, b) => {
            let aDate = a.created_date || a.connected_date
            let bDate = b.created_date || b.connected_date
            return (
                aDate < bDate ? -1 
              : aDate > bDate ? 1 
              : 0
            )
        })

    return (
        <Component
            className={
                [
                    className,
                    classNames.Host,
                    !allMessage.length && classNames.NoneMessage
                ].join(" ")
            }
            {...props}
        >
            {allMessage.length != 0 ?
                allMessage.map(x => 
                    x._name == "connection" ? 
                        x.url ?
                            <MessageInformation>
                                    Page: {x.url}
                            </MessageInformation>
                      :     <div/>
                  : x._name == "visitor" ?
                        x.type == "image" ? 
                            <VisitorImageMessage
                                key={x.id}
                                url={x.url} 
                                timestamp={x.created_date}
                                balloonColor="#DDD"
                            />
                      :     <VisitorMessage
                                balloonColor="#DDD"
                                key={x.id}
                                messageColor="Black"
                                onDelete={async e =>
                                    await visitorMessageApi.delete({
                                        visitor: {
                                            id: visitorId
                                        },
                                        message : {
                                            id: x.id
                                        }
                                    })
                                }
                                text={x.text}
                                timestamp={x.created_date}
                            />
                  : x._name == "operator" ? 
                        x.type == "image" ?
                            <OperatorImageMessage
                                key={x.id}
                                url={x.url}
                                timestamp={x.created_date}
                                balloonColor="#DDD"
                            />
                      :     <OperatorMessage
                                key={x.id}
                                onDelete={async e =>
                                    await visitorReceivedMessageApi.delete({
                                        visitor: {
                                            id: visitorId
                                        },
                                        message : {
                                            id: x.id
                                        }
                                    })
                                }
                                text={x.text}
                                timestamp={x.created_date}
                                balloonColor="#DDD"
                                messageColor="Black"
                            />
                  : x._name == "trigger" ?
                        x.type == "image" ?
                            <OperatorImageMessage
                                key={x.id}
                                url={x.url}
                                timestamp={x.created_date}
                                balloonColor="#C8E6C9"
                            />
                      :     <OperatorMessage
                                key={x.id}
                                text={x.text}
                                timestamp={x.created_date}
                                balloonColor="#C8E6C9"
                                messageColor="Black"
                                onDelete={async e =>
                                    await visitorTriggerMessageApi.delete({
                                        visitor: {
                                            id: visitorId
                                        },
                                        message : {
                                            id: x.id
                                        }
                                    })
                                }
                            />
                  : null
                )
          :     <div>
                    <MaterialIcon >chat_bubble_outline</MaterialIcon>
                    <div>会話記録はありません。</div>
                </div>
            }
        </Component>
    )
}
