import React  from "react"
import Ripple from "react-material/ui/effect/Ripple"

import classNames from "familiar-client/ui/view/common/list/ListItem/classNames"

export default ({
    children,
    className,
    disabled = false,
    list,
    ...props
}) =>
    <li
        className={classNames.Host}
        children={!disabled && children}
    >
        {
            !disabled
         && <Ripple
                className={
                    [
                        className,
                        classNames.Link
                    ].join(" ")
                }
                children={children}
                {...props}
            />
        }
        {list}
    </li>
