import React          from "react"
import ChatContent    from "familiar-client/ui/view/widget/ChatContent"
import VisitorSummary from "familiar-client/ui/view/widget/VisitorSummary"
import IconToggle     from "react-material/ui/view/IconToggle"
import MaterialIcon   from "react-material/ui/view/MaterialIcon"
import Shadow         from "react-material/ui/effect/Shadow"

import classNames from "familiar-client/ui/view/widget/ChatWidget/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            organizationId: undefined,
            visitor       : undefined,
            widget        : undefined,
        })
    }

    render() {
        let {
            correspondingUserApi,
            component = "div",
            Component = component,
            className,
            documentImageApi,
            getCurrentUserId = _ => undefined,
            onClose = e => undefined,
            onExpand = e => undefined,
            user,
            userFixedPhrases = [],            
            visitor,
            visitorDeselect = visitorId => undefined,
            visitorMessageApi,
            visitorReceivedMessageApi,
            visitorReceivedMessageImageApi,
            visitorTriggerMessageApi,
            organizationFixedPhrases = [],
            ...props
        } = this.props

        return (
            <Component
                className={
                    [
                        className,
                        classNames.Host
                    ].join(" ")
                }
                {...props}
            >
                <div
                    className={classNames.TitleBar}
                >
                    <p
                        className={classNames.Title}
                    >
                        Name : {visitor && visitor.name ||  visitor.general.name}
                    </p>
                    <IconToggle
                        className={classNames.IconToggle}
                        onClick={e => visitorDeselect(visitor.id)}
                    >
                        <MaterialIcon>
                            exit_to_app
                        </MaterialIcon>
                    </IconToggle>
                    <IconToggle
                        className={classNames.IconToggle}
                        onClick={onExpand}
                    >
                        <MaterialIcon>
                            fullscreen
                        </MaterialIcon>
                    </IconToggle>
                    <IconToggle
                        className={classNames.IconToggle}
                        onClick={onClose}
                    >
                        <MaterialIcon>
                            close
                        </MaterialIcon>
                    </IconToggle>
                </div>
                <VisitorSummary
                    component={Shadow}
                    visitor={visitor}
                />
                <ChatContent
                    className={classNames.ChatContent}
                    correspondingUserApi={correspondingUserApi}
                    documentImageApi={documentImageApi}
                    getCurrentUserId={getCurrentUserId}
                    user={user}
                    visitor={visitor}
                    visitorMessageApi={visitorMessageApi}
                    visitorReceivedMessageApi={visitorReceivedMessageApi}
                    visitorReceivedMessageImageApi={visitorReceivedMessageImageApi}
                    visitorTriggerMessageApi={visitorTriggerMessageApi}
                    organizationFixedPhrases={organizationFixedPhrases}
                    userFixedPhrases={userFixedPhrases}
                />
            </Component>
        )
    }
}

