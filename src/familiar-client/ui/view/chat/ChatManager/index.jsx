import React                  from "react"
import VisitorList            from "familiar-client/ui/view/chat/VisitorList"
import VisitorListItem        from "familiar-client/ui/view/chat/VisitorListItem"
import getAllMessageByVisitor from "familiar-client/util/getAllMessageByVisitor"

import classNames from "familiar-client/ui/view/chat/ChatManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            sortColumn: "visitorMessageCount",
            isAsc     : true,
        })
    }

    render() {
        let {
            className,
            getCurrentUserId = _ => undefined,
            selectedVisitorIds = [],
            visitorApi: {
                read,
                update
            },
            visitors,
            visitorSelect = visitorId => undefined,
            visitorDeselect = visitorId => undefined,
            ...props
        } = this.props

        switch (this.state.sortColumn) {
            case "visitorMessageCount"       : visitors.sort((a, b) => 
                                            this.state.isAsc ? 
                                                a.general.messages.length < b.general.messages.length ? -1
                                              : a.general.messages.length > b.general.messages.length ? 1 
                                              : 0
                                          :     a.general.messages.length > b.general.messages.length ? -1
                                              : a.general.messages.length < b.general.messages.length ? 1 
                                              : 0
                                        )
                break
            case "messageCreatedDate" : visitors.sort((a, b) => {
                let x = [a, b].map(v => (getAllMessageByVisitor(v).pop() || {}).created_date)
                return (
                    this.state.isAsc ? 
                        x[0] < x[1] ? -1 
                      : x[0] > x[1] ? 1 
                      : 0
                  :     x[0] > x[1] ? -1 
                      : x[0] < x[1] ? 1 
                      : 0
                )
            })
                break
            case "unreadCount"        : visitors.sort((a, b) => {
                let x = [a, b].map(v => {
                    let readDate    = (v.read_times.find(y => y.id == getCurrentUserId()) || {}).read_date;
                    return v.general.messages.filter(x => x.created_date > readDate).length
                })
                return (
                    this.state.isAsc ? 
                        x[0] < x[1] ? -1 
                      : x[0] > x[1] ? 1 
                      : 0
                  :     x[0] > x[1] ? -1 
                      : x[0] < x[1] ? 1 
                      : 0
                )
            })
                break
            case "visitCount"         : visitors.sort((a, b) => 
                                            this.state.isAsc ? 
                                                a.general.visit_count < b.general.visit_count ? -1 
                                              : a.general.visit_count > b.general.visit_count ? 1 
                                              : 0
                                          :     a.general.visit_count > b.general.visit_count ? -1 
                                              : a.general.visit_count < b.general.visit_count ? 1 
                                              : 0
                                        )
                break
            case "visitorId"          : visitors.sort((a, b) => 
                                            this.state.isAsc ? 
                                                a.id < b.id ? -1 
                                              : a.id > b.id ? 1 
                                              : 0
                                          :     a.id > b.id ? -1 
                                              : a.id < b.id ? 1 
                                              : 0
                                        )
                break
        }

        return (
            <div
                className={
                    [
                        classNames.Host,
                        className
                    ].join(" ")
                }
                {...props}
            >
                <VisitorList
                    className={classNames.VisitorList}
                    onColumnChange={sortColumn =>
                        this.setState({sortColumn})
                    }
                    onSortButtonClick={e => 
                        this.setState({isAsc: !this.state.isAsc})
                    }
                    isAsc={this.state.isAsc}
                    sortColumn={this.state.sortColumn}
                >
                    {visitors.map(x =>
                        <VisitorListItem
                            getCurrentUserId={getCurrentUserId}
                            visitor={x}
                            key={x.id}
                            onClick={async e => {
                                if (!selectedVisitorIds.includes(x.id))
                                    visitorSelect(x.id)
                                else
                                    visitorDeselect(x.id)
                            }}
                            selected={
                                selectedVisitorIds.includes(x.id)
                            }
                        />
                    )}
                </VisitorList>
            </div>
        )
    }
}


