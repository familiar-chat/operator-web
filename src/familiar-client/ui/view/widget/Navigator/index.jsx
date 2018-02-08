import React           from "react"
import FontAwesomeIcon from "familiar-client/ui/view/common/FontAwesomeIcon"
import List            from "react-material/ui/view/List"

import classNames from "familiar-client/ui/view/widget/Navigator/classNames"

export default ({
    className,
    navigator={},
    ...props
}) => {

    let ua  = (navigator.user_agent  || "").toLowerCase()
    let ver = (navigator.app_version || "").toLowerCase()

    let device = ua.indexOf('iphone')  !== -1
              || ua.indexOf('ipod')    !== -1 ? ["IPhone", "\uf10b"]
               : ua.indexOf('ipad')    !== -1 ? ["IPad", "\uf10a"]
               : ua.indexOf('android') !== -1 ? ["Android", "\uf17b"]
               : ua.indexOf('windows') !== -1 
              && ua.indexOf('phone')   !== -1 ? ["Windows Phone", "\uf17a"]
               :                                ["PC", "\uf108"]
    
    let browser = ua.indexOf("edge")      !== -1   ? ["Edge",      "\uf282"]
                : ua.indexOf("iemobile")  !== -1   ? ["IE Mobile", "\uf26b"]
                : ua.indexOf("trident/7") !== -1   ? ["IE11",      "\uf26b"]
                : ua.indexOf("msie") !== -1 && ua.indexOf("opera") === -1 ?
                      ver.indexOf("msie 6.")  !== -1 ? ["IE6",  "\uf26b"]
                    : ver.indexOf("msie 7.")  !== -1 ? ["IE7",  "\uf26b"]
                    : ver.indexOf("msie 8.")  !== -1 ? ["IE8",  "\uf26b"]
                    : ver.indexOf("msie 9.")  !== -1 ? ["IE9",  "\uf26b"]
                    : ver.indexOf("msie 10.") !== -1 ? ["IE10", "\uf26b"]
                    :                                  ["IE",   "\uf26b"]
                : ua.indexOf("chrome")  !== -1 && ua.indexOf("edge")   === -1 ? ["Chrome",  "\uf268"]
                : ua.indexOf("safari")  !== -1 && ua.indexOf("chrome") === -1 ? ["Safari",  "\uf267"]
                : ua.indexOf("opera")   !== -1                                ? ["Opera",   "\uf26a"]
                : ua.indexOf("firefox") !== -1                                ? ["Firefox", "\uf269"]
                :                                                               ["不明",     "\uf059"]

    return (
        <List>
            <Component
                icon={device[1]}
                label={"デバイス"}
                value={device[0]}
            />
            <Component
                icon={browser[1]}
                label={"ブラウザ"}
                value={browser[0]}
            />
        </List>
    )
}

let Component = ({
    label,
    icon,
    value
}) => 
    <div
        className={classNames.Host}
    >
        <div>
            {label}
        </div>
        <div>
            <FontAwesomeIcon
                icon={icon}
            />
            <div>
                {value}
            </div>
        </div>
    </div>

