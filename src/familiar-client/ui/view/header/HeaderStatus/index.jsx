import React         from "react"
import Button        from "familiar-client/ui/view/header/HeaderButton"
import Avatar        from "react-material/ui/view/Avatar"

import classNames from "familiar-client/ui/view/header/HeaderStatus/classNames"

export default ({
    user,
    ...props
}) =>
    <Button
        className={classNames.Host}
        {...props}
    >
        <div>
            <p className={classNames.Name}>
                {user && user.name}
            </p>
            <span
                className={classNames.State}
            >
                {user && user.state == 1 ? "受付中" : "退席中"}
            </span>
        </div>
        <div
            className={classNames.presenceStatus}
        >
            <Avatar
                src={user && user.image}
                className={classNames.OperatorImg}
            />
            <span
                className={
                    [
                        classNames.statusIcon,
                        user && user.state == 1 ? classNames.OnLine : classNames.OffLine
                    ].join(" ")
                }
            >
                <span/>
            </span>
        </div>
    </Button>