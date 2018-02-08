import React      from "react"

import classNames from "familiar-client/ui/view/widget/Datum/classNames"

export default ({
    className,
    label,
    value,
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
      <p
          className={classNames.Label}
      >
          {label ? label : "未設定"}
      </p>
      <p
          className={classNames.Value}
      >
          {value ? value : "未設定"}
      </p>
    </div>