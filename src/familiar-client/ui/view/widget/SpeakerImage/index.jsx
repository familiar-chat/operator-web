import React  from "react"

import classNames from "familiar-client/ui/view/widget/SpeakerImage/classNames"

export default ({
    src,
    className,
    ...props
}) => 
  <div
      className={
        [
          className,
          classNames.Host
        ].join(" ")
      }
  >
    <span></span>
    <img
        src={src ? src : "https://2.bp.blogspot.com/-rIea5gHJLBM/WLjrFd0D2BI/AAAAAAABCSw/b8dLIk9cAn0um5oo0KZq756CxqP3PDYPACLcB/s400/keitai_mukashi.png"}
    />
  </div>