import React  from "react"
import Button from "react-material/ui/view/Button"

import classNames from "familiar-client/ui/view/common/LabeledItem/classNames"

module.exports = ({
    children,
    className,
    component = "li",
    Component = component,
    label,
    labelWidth,
    value,
    ...props
}) =>
    <Component
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    >
        <div
            style={{
                minWidth: labelWidth
            }}
        >
            {label}
        </div>
        <div>
            {value}
        </div>
    </Component>
