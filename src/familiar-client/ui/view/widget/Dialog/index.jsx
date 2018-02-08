import React             from "react"
import ChatContent       from "familiar-client/ui/view/widget/ChatContent"
import VisitorItems      from "familiar-client/ui/view/widget/VisitorItems"
import Dialog            from "react-material/ui/view/Dialog"
import IconToggle        from "react-material/ui/view/IconToggle"
import MaterialIcon      from "react-material/ui/view/MaterialIcon"
import Shadow            from "react-material/ui/effect/Shadow"

import classNames from "familiar-client/ui/view/widget/Dialog/classNames"

export default ({
    correspondingUserApi,
    documentImageApi,
    getCurrentUserId,
    userFixedPhrases,
    organizationFixedPhrases,
    user,
    visible,
    visitor,
    visitorApi,
    visitorDeselect = visitorId => undefined,
    visitorMessageApi,
    visitorReceivedMessageApi,
    visitorReceivedMessageImageApi,
    visitorTriggerMessageApi,
    onCancel = e => undefined,
    ...props
}) =>
    <Dialog
        className={classNames.Host}
        visible={visible}
        {...props}
    >
        <div
            className={classNames.TitleBar}
        >
            <p
                className={classNames.Title}
            >
                Name : {visitor && (visitor.name || visitor.general.name)}
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
                onClick={onCancel}
            >
                <MaterialIcon>
                    close
                </MaterialIcon>
            </IconToggle>
        </div>
        <div
            className={classNames.DialogBody}
        >
            <ChatContent
                className={classNames.ChatContent}
                correspondingUserApi={correspondingUserApi}
                documentImageApi={documentImageApi}
                getCurrentUserId={getCurrentUserId}
                organizationFixedPhrases={organizationFixedPhrases}
                user={user}
                userFixedPhrases={userFixedPhrases}
                visitor={visitor}
                visitorMessageApi={visitorMessageApi}
                visitorReceivedMessageApi={visitorReceivedMessageApi}
                visitorReceivedMessageImageApi={visitorReceivedMessageImageApi}
                visitorTriggerMessageApi={visitorTriggerMessageApi}
            />
            <VisitorItems
                component={Shadow}
                offset="2"
                position="left"
                visitor={visitor}
                visitorApi={visitorApi}
            />
        </div>
    </Dialog>
