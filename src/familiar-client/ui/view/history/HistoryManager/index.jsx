import React                     from "react"
import ReactDOM                  from "react-dom"
import FABSpace                  from "familiar-client/ui/view/common/FABSpace"
import ChatHistoryExpansionPanel from "familiar-client/ui/view/history/ChatHistoryExpansionPanel"
import ChatHistoryInformation    from "familiar-client/ui/view/history/ChatHistoryInformation"
import Log                       from "familiar-client/ui/view/widget/Log"
import Shadow                    from "react-material/ui/effect/Shadow"
import ExpansionPanelList        from "react-material/ui/view/ExpansionPanelList"
import Indicator                 from "react-material/ui/view/Indicator"

import classNames from "familiar-client/ui/view/history/HistoryManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            loading        : false,
            loaded         : false,
            onNext         : _ => undefined,
            selectedIndex  : [],
            totalCount     : 0,
            visitors       : [],
        })
    }

    componentDidMount() {
        const firstLeadNum = 20
        const leadNum      = 20

        ;(async _ => {

            let {
                visitorApi: {
                    read     : read
                }
            } = this.props

            this.setState (
                {
                    onNext: async _ => {
                        this.setState({
                            loading: true,
                        })

                        let visitors = this.state.visitors.concat(
                            (
                                await read({
                                    startAt: this.state.lastId,
                                    limit  : leadNum + 1
                                })
                            )
                                .filter((x, i) => i != 0)
                        )

                        this.setState({
                            visitors,
                            loading   : false,
                            totalCount: this.state.totalCount += leadNum,
                            loaded    : visitors[visitors.length - 1].id == this.state.lastId,
                            lastId    : visitors[visitors.length - 1].id
                        })
                    },
                    loading: true,
                    visitors: await read({limit  : firstLeadNum})
                },
                _ => this.setState({
                    totalCount: firstLeadNum,
                    lastId    : this.state.visitors.length && this.state.visitors[this.state.visitors.length - 1].id,
                    loading   : false,
                    loaded    : this.state.visitors.length == 0 ? true : false
                })
            )
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
                <ExpansionPanelList
                    onSelected={({index}) => this.setState({
                        selectedIndex: index
                    })}
                    onUnselected={({index}) => this.setState({
                        selectedIndex: undefined
                    })}
                    selectedIndexes={
                        this.state.selectedIndex == undefined ? []
                                                              : [this.state.selectedIndex]
                    }
                >
                    {this.state.visitors.map(x => {

                        return (
                            <ChatHistoryExpansionPanel
                                key={x.id}
                                labelText={x.name || x.general.name}
                                visitor={x}
                            >
                                <div
                                    className={classNames.PanelContent}
                                    ref="content"
                                >
                                    <Log
                                        component={Shadow}
                                        connections={v.general.connections}
                                        messages={x.general.messages}
                                        receivedMessages={x.general.received_messages}
                                        triggerMessages={x.general.trigger_messages}
                                        offset="2"
                                    />
                                    <Shadow
                                        offset="2"
                                    >
                                        <ChatHistoryInformation
                                            visitor={x}
                                        />
                                    </Shadow>
                                </div>
                            </ChatHistoryExpansionPanel>

                        )
                    })}
                </ExpansionPanelList>
                <Indicator
                    loading={this.state.loading}
                    loaded={this.state.loaded}
                    onNext={async _ => await this.state.onNext()}
                    type = "circle"
                />
                <FABSpace/>
            </div>
        )
    }
}