import React            from "react"
import Message          from "familiar-client/ui/view/widget/Message"
import SpeakerImage     from "familiar-client/ui/view/widget/SpeakerImage"
import TransmissionTime from "familiar-client/ui/view/widget/TransmissionTime"
import MaterialIcon     from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/widget/OperatorMessage/classNames"

export default ({
    balloonColor,
    className,
    messageColor,
    onDelete = e => undefined,
    src,
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
        <MaterialIcon
            onClick={onDelete}
            className={classNames.Icon}
        >
            cancel
        </MaterialIcon>
        <TransmissionTime
            timestamp={timestamp}
        />
        <Message
            arrowPosition="right"
            text={text}
            balloonColor={balloonColor}
            messageColor={messageColor}
        />
    </div>