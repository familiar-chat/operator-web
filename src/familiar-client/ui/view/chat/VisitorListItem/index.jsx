import React                    from "react"
import DurationTime             from "familiar-client/ui/view/common/DurationTime"
import FormatStringDate         from "familiar-client/ui/view/common/FormatStringDate"
import LabeledItem              from "familiar-client/ui/view/common/LabeledItem"
import getAllMessageByVisitor   from "familiar-client/util/getAllMessageByVisitor"
import LinearLayout             from "react-material/ui/view/LinearLayout"
import ListItem                 from "react-material/ui/view/ListItem"
import ListItemTextArea         from "react-material/ui/view/ListItemTextArea"
import MaterialIcon             from "react-material/ui/view/MaterialIcon"
import Ripple                   from "react-material/ui/effect/Ripple"

import classNames from "familiar-client/ui/view/chat/VisitorListItem/classNames"

export default ({
    className,
    getCurrentUserId = _ => undefined,
    selected = false,
    style,
    visitor,
    ...props,
}) => {
    let allMessage  = getAllMessageByVisitor(visitor)
    let lastMessage = allMessage[allMessage.length - 1] || {}
    let readDate    = (visitor.read_times.find(x => x.id == getCurrentUserId()) || {}).read_date;
    let isAllRead   = allMessage.filter(x => x.created_date > readDate).length ? false : true
    let unreadCount = readDate ? visitor.general.messages.filter(x => x.created_date > readDate).length : visitor.general.messages.length

    return (
        <ListItem
            className={
                [
                    className,
                    classNames.Host,
                ].join(" ")
            }
            style={{
                backgroundColor: selected ? "#edf9ff" : "",
                ...style
            }}
            {...props}
        >
            <LinearLayout
                className={classNames.Content}
                orientation="horizontal"
            >
                <LinearLayout
                    className={classNames.LeftContent}
                >
                    <LinearLayout>
                        <span
                            className={classNames.Name}
                            title="訪問者名"
                        >
                            {visitor.name || visitor.general.name}
                        </span>
                        <span
                            title="情報"
                        >
                            {visitor.information}
                        </span>
                        <LinearLayout>
                        </LinearLayout>
                        <div
                            className={classNames.Pathname}
                        >
                            {visitor.general.location && visitor.general.location.pathname}
                        </div>
                    </LinearLayout>
                    <LinearLayout
                        orientation="horizontal"
                        title="最終発言"
                    >
                        <span
                            className={classNames.SenderName}
                        >
                            {
                                lastMessage._name == "message"          ? "訪問者: "
                              : lastMessage._name == "received_message" ? "オペレーター: "
                              : lastMessage._name == "trigger_message"  ? "自動応答: "
                              :                                           ""
                            }
                        </span>
                        <span
                            className={classNames.MessageText}
                        >
                            {lastMessage.text || (lastMessage.url && "画像メッセージ") || "発言なし"}
                        </span>
                    </LinearLayout>
                </LinearLayout>
                <LinearLayout
                    className={classNames.RightContent}
                >
                    <LinearLayout>
                        {
                            lastMessage ?
                            <FormatStringDate
                                className={classNames.LastMessageDate}
                                timestamp={lastMessage.created_date}
                                title="最終発言時間"
                                format="%DD%日 %HH%時%mm%分%ss%秒"
                            />
                          : <div/>
                        }
                    </LinearLayout>
                    {
                        unreadCount
                      ? <div
                            className={classNames.Badge + " " + classNames.NumberBadge}
                        >
                            {unreadCount}
                        </div>
                      : <MaterialIcon
                            className={classNames.Badge + " " + classNames.AlreadyReadBadge}
                        >
                            {isAllRead ? "done_all" : "done"}
                        </MaterialIcon>
                    }
                    <LinearLayout
                        orientation="horizontal"
                    >
                        <LinearLayout
                            orientation="horizontal"
                            title="訪問回数"
                        >
                            <MaterialIcon
                                className={classNames.VisitCountIcon}
                            >
                                transfer_within_a_station
                            </MaterialIcon>
                            <span>
                                {visitor.general.visit_count}
                            </span>
                        </LinearLayout>
                        <LinearLayout
                            orientation="horizontal"
                            title="発言回数"
                        >
                            <MaterialIcon
                                className={classNames.MessageCountIcon}
                            >
                                forum
                            </MaterialIcon>
                            <span>
                                {allMessage.length}
                            </span>
                        </LinearLayout>
                        <LinearLayout
                            orientation="horizontal"
                            title="滞在時間"
                        >
                            <MaterialIcon
                                className={classNames.DurationTimeIcon}
                            >
                                timer
                            </MaterialIcon>
                            <DurationTime
                                connections={visitor.general.connections}
                            />
                        </LinearLayout>
                    </LinearLayout>
                </LinearLayout>
            </LinearLayout>
        </ListItem>
    )
}