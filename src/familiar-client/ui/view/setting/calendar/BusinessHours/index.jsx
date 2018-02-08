import React          from "react"
import Switch         from "react-material/ui/view/Switch"
import IntervalSlider from "react-material/ui/view/IntervalSlider"
import TextField      from "react-material/ui/view/form/TextField"

import classNames from "familiar-client/ui/view/setting/calendar/BusinessHours/classNames"

export default ({
    calendar,
    className,
    update = calendar => undefined,
    ...props
}) =>
    <div
        className={
            [
                className,
                classNames.Host,
            ].join(" ")
        }
        {...props}
    >
        <div
            className={classNames.DayOfTheWeek}
        >
            {
                calendar ?
                    calendar.day_of_the_week == 1 ? "月曜日"
                  : calendar.day_of_the_week == 2 ? "火曜日"
                  : calendar.day_of_the_week == 3 ? "水曜日"
                  : calendar.day_of_the_week == 4 ? "木曜日"
                  : calendar.day_of_the_week == 5 ? "金曜日"
                  : calendar.day_of_the_week == 6 ? "土曜日"
                  : calendar.day_of_the_week == 7 ? "日曜日"
                  : "不明"
              : ""
            }
        </div>
        <Switch
            enabled={
                calendar.enabled
            }
            onClick={async e => {
                calendar.enabled = !calendar.enabled
                await update(calendar)
            }}
        />
        <div
            className={classNames.BusinessHours}
        >
            <div
                className={classNames.Time}
            >
                <TextField
                    type="number"
                    min={-1}
                    max={24}
                    value={ ("0" + parseInt(calendar.start_time / 3600)).slice(-2)}
                    onChange={async e => {
                        let currentHour = calendar.start_time % 3600
                        let hour        = e.target.value < 24 && e.target.value >= 0 ? e.target.value * 3600
                            : e.target.value.slice(-2) * 3600
                        let time        = currentHour + hour

                        if (calendar.end_time > time && time >= 0 && time <= 86400) {
                            calendar.start_time = time
                            await update(calendar)
                        }
                    }}
                    disabled={!calendar.enabled}
                />
                :
                <TextField
                    type="number"
                    min={-1}
                    max={60}
                    value={ ("0" + parseInt(calendar.start_time % 3600 / 60)).slice(-2)}
                    onChange={async e => {
                        let currentMinute = calendar.start_time - parseInt(calendar.start_time % 3600)
                        let minute        = e.target.value < 60 && e.target.value >= 0 ? e.target.value * 60
                            : e.target.value.slice(-2) * 60
                        let time          = currentMinute + minute

                        if (calendar.end_time > time && time >= 0 && time <= 86400) {
                            calendar.start_time = time
                            await update(calendar)
                        }
                    }}
                    disabled={!calendar.enabled}
                />
            </div>
            <IntervalSlider
                min={0}
                max={86400}
                step={600}
                onChange={async (x, y) => {
                    calendar.start_time = x
                    calendar.end_time   = y
                    await update(calendar)

                }}
                dotIsView={false}
                defaultLow={ calendar.start_time}
                defaultHigh={ calendar.end_time}
                disabled={ !calendar.enabled}
                lowTitle={
                    parseInt(calendar.start_time / 3600) + ":" + ("0" + parseInt(calendar.start_time % 3600 / 60)).slice(-2)
                }
                highTitle={
                    parseInt(calendar.end_time / 3600) + ":" + ("0" + parseInt(calendar.end_time % 3600 / 60)).slice(-2)
                }
            />
            <div
                className={classNames.Time}
            >
                <TextField
                    type="number"
                    min={-1}
                    max={24}
                    value={ ("0" + parseInt(calendar.end_time / 3600)).slice(-2)}
                    onChange={async e => {
                        let currentHour = calendar.end_time % 3600
                        let hour        = e.target.value < 24 && e.target.value >= 0 ? e.target.value * 3600 : e.target.value.slice(-2) * 3600
                        let time        = currentHour + hour
                        if (calendar.start_time < time && time >= 0 && time <= 86400) {
                            calendar.end_time = time
                            await update(calendar)
                        }
                    }}
                    disabled={ !calendar.enabled}
                />
                :
                <TextField
                    type="number"
                    min={-1}
                    max={60}
                    value={ ("0" + parseInt(calendar.end_time % 3600 / 60)).slice(-2)}
                    onChange={async e => {
                        let currentMinute = calendar.end_time - parseInt(calendar.end_time % 3600)
                        let minute        = e.target.value < 60 && e.target.value >= 0 ? e.target.value * 60 : e.target.value.slice(-2) * 60
                        let time          = currentMinute + minute
                        if (calendar.start_time < time && time >= 0 && time <= 86400) {
                            calendar.end_time = time
                            await update(calendar)
                        }
                    }}
                    disabled={!calendar.enabled}
                />
            </div>
        </div>
    </div>
