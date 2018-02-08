import React from "react"
import Card  from "react-material/ui/view/Card"

import classNames from "familiar-client/ui/view/dashboard/DashboardCard/classNames"

export default ({
    children,
    className,
    title,
    ...props
}) =>
    <Card
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    >
        <div>
            {title}
        </div>
        <div>
            {children}
        </div>
    </Card>
