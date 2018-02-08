import React        from "react"
import Image        from "react-material/ui/view/Image"

import classNames from "familiar-client/ui/view/common/EditableAvatar/classNames"

export default ({
    children,
    className,
    component = "div",
    Component = component,
    src,
    ...props
}) =>
    <Component
        className={[
            className,
            classNames.Host,
        ].join(" ")}
        {...props}
    >
        <Image
            src={src}
            className={classNames.Image}
        />
        {children}
        <div
            className={classNames.Text}
        >
            変更
        </div>
  </Component>
