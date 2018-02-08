import React  from "react"
import {Link} from "react-router-dom"

import classNames from "familiar-client/ui/view/common/Link/classNames"

export default ({
    className,
    ...props
}) =>
    <Link
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    />
