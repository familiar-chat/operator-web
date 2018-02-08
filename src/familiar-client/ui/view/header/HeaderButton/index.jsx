import React  from "react"
import Button from "react-material/ui/view/Button"

import classNames from "familiar-client/ui/view/header/HeaderButton/classNames"

export default ({
    className,
    ...props
}) =>
    <Button
        type="flat"
        className={
            [
                className,
                classNames.Host 
            ].join(" ")
        }
        {... props}
    />
