import React      from "react"
import classNames from "familiar-client/ui/view/widget/Message/classNames"

export default ({
    arrowPosition = "left",
    text,
    balloonColor = "#f6f6f6",
    messageColor = "black",
    className,
    ...props
}) =>
    <div
        className={
            [
                className,
                classNames.ArrowBox,
                arrowPosition == "left" ? classNames.Left
                  : classNames.Right
            ].join(" ")
        }
        style={{
            backgroundColor: balloonColor
        }}
    >
        <pre
            className={classNames.Host}
            style={{
                color: messageColor,
            }}
            {...props}
        >
            {text}
        </pre>
    </div>