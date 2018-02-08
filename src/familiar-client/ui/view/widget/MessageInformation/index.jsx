import React      from "react"
import classNames from "familiar-client/ui/view/widget/MessageInformation/classNames"

export default ({
    className,
    children,
    ...props
}) =>
    <div
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    >
        <div
            className={classNames.Text}
        >
            {children}
        </div>
    </div>