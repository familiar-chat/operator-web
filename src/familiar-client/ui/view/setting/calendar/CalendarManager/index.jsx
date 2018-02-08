import React         from "react"
import FABSpace      from "familiar-client/ui/view/common/FABSpace"
import BusinessHours from "familiar-client/ui/view/setting/calendar/BusinessHours"
import Button        from "react-material/ui/view/Button"

import classNames from "familiar-client/ui/view/setting/calendar/CalendarManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            calendars           : [],
            changedCalendars    : [],
            subscribeCertificate: undefined
        })
    }

    componentDidMount() {        
        ;(async _ => {
            let {
                calendarApi: {
                    subscribe: subscribe
                }
            } = this.props

            let onChanged = x =>
                this.setState({
                    calendars: x
                })

            this.setState({
                subscribeCertificate: await subscribe({
                    subscriber: onChanged
                })
            })
        })()
    }

    componentWillUnmount() {
        let {
            calendarApi: {
                unsubscribe
            }
        } = this.props

        if (this.state.subscribeCertificate)
            unsubscribe(this.state.subscribeCertificate)
    }

    render() {
        let {
            className,
            calendarApi: {
                update
            },
            ...props
        } = this.props

        return (
            <div
                className={
                    [
                        className,
                        classNames.Host,
                    ].join(" ")
                }
                {...props}
            >
                {
                    this.state.calendars.map(s =>
                        <div
                            key={s.id}
                        >
                            <BusinessHours
                                calendar={s}
                                update={c =>
                                    this.setState({
                                        calendars       : this.state.calendars.map( a => a.id == c.id ? c : a),
                                        changedCalendars: this.state.changedCalendars.concat(s)
                                    })
                                }
                            />
                            <Button
                                type="flat"
                                disabled={!this.state.changedCalendars.some(x => x.id == s.id)}
                                onClick={async _ => {
                                    await update({
                                        calendar: {
                                            id: s.id,
                                            ...this.state.calendars[s.id]
                                        }
                                    })
                                    this.setState({
                                        changedCalendars: this.state.changedCalendars.filter(x => x == s.id)
                                    })
                                }}
                            >
                                変更を保存
                            </Button>
                        </div>
                    )
                }
                <FABSpace/>
            </div>
        )
    }
}