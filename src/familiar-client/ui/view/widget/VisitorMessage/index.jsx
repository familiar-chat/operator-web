import React            from "react"
import Message          from "familiar-client/ui/view/widget/Message"
import TransmissionTime from "familiar-client/ui/view/widget/TransmissionTime"
import MaterialIcon     from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/widget/VisitorMessage/classNames"

export default ({
    balloonColor,
    className,
    messageColor,
    onDelete = e => undefined,
    text,
    timestamp,
    ...props
}) =>
    <div
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
    >
        <Message
            arrowPosition="left"
            text={text}
            balloonColor={balloonColor}
            messageColor={messageColor}
        />
        <TransmissionTime
            timestamp={timestamp}
        />
        <MaterialIcon
            onClick={onDelete}
            className={classNames.Icon}
        >
            cancel
        </MaterialIcon>
    </div>
