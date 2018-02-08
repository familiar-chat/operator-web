import React                     from "react"
import ReactDOM                  from "react-dom"
import MessageCountCard          from "familiar-client/ui/view/dashboard/MessageCountCard"
import VisitorCountCard          from "familiar-client/ui/view/dashboard/VisitorCountCard"
import FABSpace                  from "familiar-client/ui/view/common/FABSpace"
import Log                       from "familiar-client/ui/view/widget/Log"
import ExpansionPanelList        from "react-material/ui/view/ExpansionPanelList"
import Indicator                 from "react-material/ui/view/Indicator"

import classNames from "familiar-client/ui/view/dashboard/DashboardManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            visitors: [],
        })
    }

    componentDidMount() {
        ;(async _ => {
            let {
                visitorApi: {
                    readByChild
                },
                ...props
            } = this.props

            let date = new Date()

            let year = date.getFullYear()
            let month = date.getMonth()

            let thisMonth = new Date(year, month, 1).getTime()
            let lastMonth = new Date(year, month -1, 1).getTime()

            this.setState({
                visitors: await readByChild({
                    child   : "general/updated_date",
                    startAt : thisMonth
                })
            })
        })()
    }
    
    render() {
        let {
            visitorApi,
            ...props
        } = this.props

        return (
            <div
                className={classNames.Host}
                {...props}
            >
                <div>
                    <MessageCountCard
                        visitors={this.state.visitors}
                    />
                    <VisitorCountCard
                        visitors={this.state.visitors}
                    />
                </div>
                <FABSpace/>
            </div>
        )
    }
}