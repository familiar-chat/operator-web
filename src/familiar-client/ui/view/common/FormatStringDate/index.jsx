import React      from "react"

import classNames from "familiar-client/ui/view/common/FormatStringDate/classNames"

//http://qiita.com/pseudo_foxkeh/items/9297a834bc8e05133e7a
let dateToFormatString = (date, fmt, locale, pad) => {
    let padding = (n, d, p) => {
        p = p || "0"
        return (p.repeat(d) + n).slice(-d)
    }
    let DEFAULT_LOCALE = "ja-JP"
    let getDataByLocale = (locale, obj, param) => {
        let array = obj[locale] || obj[DEFAULT_LOCALE]
        return array[param]
    }
    let format = {
        "YYYY": _ => padding(date.getFullYear(), 4, pad),
        "YY"  : _ => padding(date.getFullYear() % 100, 2, pad),
        "MMMM": (locale) => 
             getDataByLocale(
                 locale, 
                 {
                    "ja-JP": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    "en-US": ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"],
                }, 
                date.getMonth()
            )
        ,
        "MMM" : (locale) => 
            getDataByLocale(
                locale, 
                {
                    "ja-JP": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    "en-US": ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
                            "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
                }, date.getMonth()
            )
        ,
        "MM"  : _ => padding(date.getMonth()+1, 2, pad),
        "M"   : _ => date.getMonth()+1,
        "DD"  : _ => padding(date.getDate(), 2, pad),
        "D"   : _ => date.getDate(),
        "HH"  : _ => padding(date.getHours(), 2, pad),
        "H"   : _ => date.getHours(),
        "hh"  : _ => padding(date.getHours() % 12, 2, pad),
        "h"   : _ => date.getHours() % 12,
        "mm"  : _ => padding(date.getMinutes(), 2, pad),
        "m"   : _ => date.getMinutes(),
        "ss"  : _ => padding(date.getSeconds(), 2, pad),
        "s"   : _ => date.getSeconds(),
        "A"   : _ => date.getHours() < 12 ? "AM" : "PM",
        "a"   : (locale) => 
            getDataByLocale(
                locale, {
                    "ja-JP": ["午前", "午後"],
                    "en-US": ["am", "pm"],
                }, 
                date.getHours() < 12 ? 0 : 1
            )
        ,
        "W"   : (locale) => 
            getDataByLocale(
                locale, 
                {
                    "ja-JP": ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
                    "en-US": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                }, 
                date.getDay()
            )
        ,
        "w"   : (locale) => {
            getDataByLocale(
                locale, 
                {
                    "ja-JP": ["日", "月", "火", "水", "木", "金", "土"],
                    "en-US":  ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
                }, 
                date.getDay()
            )
        },
    }
    let fmtstr = [""]
    Object.keys(format).forEach((key) => {
        fmtstr.push(key)
    })
    let re = new RegExp("%(" + fmtstr.join("|") + ")%", "g")

    let replaceFn = (match, fmt) => {
        if(fmt === "") 
            return "%"
        let func = format[fmt]

        if(func === undefined) 
            return match

        return func(locale)
    }

    return fmt.replace(re, replaceFn)
}

module.exports   = ({
    children,
    className,
    component = "span",
    Component = component,
    timestamp,
    format,
    locale,
    pad,
    ...props
}) =>
    <Component
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {... props}
    >
        {dateToFormatString(new Date(timestamp), format, locale, pad)}
    </Component>
