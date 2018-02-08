import React from "react"
import List  from "familiar-client/ui/view/common/list/List"

import classNames from "familiar-client/ui/view/common/toolBar/ToolBarList/classNames"

export default ({
    position = "left",
    ...props
}) =>
    <List
        className={
            [
                classNames.Host,
                position == "left" ? classNames.Left 
              :                      classNames.Right
            ].join(" ")
        }
        {...props}
    />
