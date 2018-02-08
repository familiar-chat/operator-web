import React    from "react"
import ReactDOM from "react-dom"
import List     from "familiar-client/ui/view/common/list/List"

import classNames from "familiar-client/ui/view/common/LabeledList/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            visitors: [],
        })
    }

    componentDidMount() {
        let e = ReactDOM.findDOMNode(this)
        this.setState({
            labelWidth: Array.from(e.parentNode.querySelectorAll(
                "." + classNames.Host + " > * > :nth-child(1)"
            ))
                .map(x => x.getBoundingClientRect().width)
                .reduce((x, y) => Math.max(x, y), 0)
        })
    }

    render() {

        let {
            children,
            className,
            ...props
        } = this.props

        return (
            <List
                className={classNames.Host}
            >
                {
                    Array.from(React.Children.toArray(children).entries()).map(([i, x]) =>
                        React.cloneElement(
                            x,
                            {
                                labelWidth: this.state.labelWidth,
                                ...x.props
                            }
                        )
                    )
                }
            </List>
        )
    }
}