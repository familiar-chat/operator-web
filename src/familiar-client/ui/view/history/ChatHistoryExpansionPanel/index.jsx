import React                    from "react"
import ReactDOM                 from "react-dom"
import getAllMessageByVisitor   from "familiar-client/util/getAllMessageByVisitor"
import Shadow                   from "react-material/ui/effect/Shadow"
import MaterialIcon             from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/history/ChatHistoryExpansionPanel/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            contentSize: undefined
        })
    }

    componentDidMount() {
        let e = ReactDOM.findDOMNode(this)

        let contentRect = e.children[1].getBoundingClientRect()

        this.setState({
            contentSize: [
                contentRect.width,
                contentRect.height
            ]
        })
    }

    render() {
        let {
            children,
            className,
            disabled,
            labelText,
            labelWidth,
            location,
            selected = false,
            visitor,
            ...props
        } = this.props

        return (
            <Shadow
                className={
                    [
                        className,
                        classNames.Host,
                        disabled ? classNames.Disabled
                      :            undefined,
                        selected ? classNames.Selected
                      :            undefined
                    ].join(" ")
                }
                component="li"
                spread="0"
                offset={selected ? "0" : "2"}
                {...props}
            >
                <div>
                    <div
                        className={classNames.Label}
                        style={{
                            minWidth: labelWidth ? labelWidth + "px"
                          :                        undefined
                        }}
                    >
                        {labelText}
                    </div>
                    <div
                        className={classNames.VisitorInformation}
                    >
                        <div><span>ドメイン</span><span>{visitor.general.location && visitor.general.location.host}</span></div>
                        <div><span>最終ページ</span><span>{visitor.general.location && visitor.general.location.pathname}</span></div>
                        <div><span>発言数</span><span>{getAllMessageByVisitor(visitor).length}</span></div>
                        <div><span>訪問数</span><span>{visitor.general.visit_count}</span></div>
                    </div>
                </div>
                <div
                    children={(
                        selected               ? children
                      : this.state.contentSize ? undefined
                      :                          children
                    )}
                    style={{
                        height: !this.state.contentSize ? undefined
                              : selected                ? this.state.contentSize[1] + "px"
                              :                           "0",
                    }}
                />
            </Shadow>
        )
    }
}
