import React           from "react"
import DurationTime    from "familiar-client/ui/view/common/DurationTime"
import MaterialIcon    from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/widget/BoxInformation/classNames"

export default ({
    className,
    label,
    value,
    connections,
    icon,
    iconColor = "#ffffff",
    unit = "",
    ...props
}) =>
    <div
        {...props}
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
    >
        <div
            className={classNames.Content}
        >
            <MaterialIcon
                className={classNames.Icon}
                style={{
                    color: iconColor
                }}
            >
                {icon}
            </MaterialIcon>
            {
                connections ?
                <DurationTime
                    className={classNames.Value}
                    connections={connections}
                    unitProps={{className: classNames.Unit}}
                />
              : <span
                    className={classNames.Value}
                >
                    {value}
                    <span className={classNames.Unit}>{unit}</span>
                </span>
            }
        </div>
        <span
            className={classNames.Label}
        >
            {label}
        </span>
    </div>
