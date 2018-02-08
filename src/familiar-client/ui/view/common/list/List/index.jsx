import React from "react"

import classNames from "familiar-client/ui/view/common/list/List/classNames"

export default ({
    className,
    ...props
}) =>
    <ul
      className={
          [
              className,
              classNames.Host
          ].join(" ")
      }
      {... props}
    />
