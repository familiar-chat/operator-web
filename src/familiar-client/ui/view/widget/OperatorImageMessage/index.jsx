import React            from "react"
import Anchor           from "familiar-client/ui/view/common/Anchor"
import ViewImageDialog  from "familiar-client/ui/view/common/ViewImageDialog"
import Message          from "familiar-client/ui/view/widget/Message"
import TransmissionTime from "familiar-client/ui/view/widget/TransmissionTime"
import Image            from "react-material/ui/view/Image"

import classNames from "familiar-client/ui/view/widget/OperatorImageMessage/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            visible: false
        })
    }

    render() {

        let {
            balloonColor,
            className,
            timestamp,
            url,
            ...props
        } = this.props

        return(  
            <div
                className={
                    [
                        className,
                        classNames.Host
                    ].join(" ")
                }
                {...prompt}
            >
                <TransmissionTime
                    timestamp={timestamp}
                />
                <Image
                    className={classNames.Image}
                    src={url}
                    width={200}
                    height={200}
                    onClick={e => 
                        this.setState({
                            visible: true
                        })
                    }
                />
                <ViewImageDialog
                    onCancel={_ => this.setState({visible: false})}
                    src={url}
                    visible={this.state.visible}
                />
            </div>
        )
    }

}
