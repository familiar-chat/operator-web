import React from "react"

import classNames from "familiar-client/ui/view/common/PageTitle/classNames"

export default ({
    title,
    description,
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
      <h1>
          {title}
      </h1>
      <p>
          {description}
      </p>
      {children}
    </div>