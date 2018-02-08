import NavigationBar        from "familiar-client/ui/view/NavigationBar"
import Header               from "familiar-client/ui/view/header/Header"
import ChatWidget           from "familiar-client/ui/view/widget/ChatWidget"
import WidgetDialog         from "familiar-client/ui/view/widget/Dialog"
import React                from "react"
import ReactDOM             from "react-dom"
import {Redirect}           from "react-router"
import FloatingActionButton from "react-material/ui/view/FloatingActionButton"
import Root                 from "react-material/ui/control/Root"
import Ripple               from "react-material/ui/effect/Ripple"
import Shadow               from "react-material/ui/effect/Shadow"
import Button               from "react-material/ui/view/Button"
import Dialog               from "react-material/ui/view/Dialog"
import DialogFooter         from "react-material/ui/view/DialogFooter"
import DialogHeader         from "react-material/ui/view/DialogHeader"
import MaterialIcon         from "react-material/ui/view/MaterialIcon"
import setState             from "react-material/util/setState"

import classNames from "familiar-client/ui/view/MainLayout/classNames"

let changeFavicon = ({
    isBadge = true
}) => {
    if (isBadge) {
        document.getElementById("apple-touch-favicon").href = "/img/badge-apple-touch-icon.png";
        document.getElementById("favicon-32x32").href       = "/img/badge-favicon-32x32.png";
        document.getElementById("favicon-16x16").href       = "/img/badge-favicon-16x16.png";
        document.getElementById("favicon").href             = "/img/badge-favicon.ico";
    } else {
        document.getElementById("apple-touch-favicon").href = "/img/apple-touch-icon.png";
        document.getElementById("favicon-32x32").href       = "/img/favicon-32x32.png";
        document.getElementById("favicon-16x16").href       = "/img/favicon-16x16.png";
        document.getElementById("favicon").href             = "/img/favicon.ico";
    }
};


let notification = n => {
    document.hidden && changeFavicon({isBadge:true})
    n.onclick = _ => {
        window.focus();
        n.close()
    }
    setTimeout(_ => n.close(), 5000)
}

let sortOnId = a => a.slice().sort((a, b) =>  a.id < b.id ? -1 : a.id > b.id ?  1 : 0)

document.addEventListener(
    "visibilitychange",
    _ => !document.hidden && changeFavicon({isBadge: false}),
    false
)

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            activeSites                                : [],
            activeVisitorIds                           : [],
            connections                                : [],            
            defaultSite                                : undefined,
            dialogVisitorId                            : undefined,
            isLockVisibleVisitorFAB                    : true,
            isInvalidationToken                        : false,
            navigationBarIsVisible                     : true,
            organizationFixedPhrases                   : [],
            selectedVisitorIds                         : [],
            sites                                      : [],
            sounds                                     : [],
            subscribeCertificateOrganizationFixedPhrase: undefined,
            subscribeCertificateUser                   : undefined,
            subscribeCertificateUserFixedPhrase        : undefined,
            subscribeCertificateSite                   : undefined,
            subscribeCertificateVisitor                : undefined,
            selectedSound                              : undefined,
            user                                       : undefined,
            userFixedPhrases                           : [],
            visibleVisitorFAB                          : true,
            visitorSelect                              : _ => undefined,
            visitorDeselect                            : visitorId =>
                this.setState({
                    selectedVisitorIds: this.state.selectedVisitorIds.filter(x => x != visitorId),
                    activeVisitorIds  : this.state.activeVisitorIds.filter(x => x!= visitorId),
                    dialogVisitorId   : this.state.dialogVisitorId == visitorId ? undefined : this.state.dialogVisitorId
                })
        })
    }

    componentDidMount() {
        ;(async _ => {
            if (window.Notification && Notification.permission === "default")
                Notification.requestPermission(r => {
                    if(r === "granted")
                        notification(new Notification(
                            "Welcome to Familiar Chat!",
                            {
                                body: "訪問者来客と新規メッセージをおしらせします。",
                                icon: "/img/familiar-notification.png"
                            }
                        ))
                })

            let token = await new Promise((resolve, reject) => {
                let loop = _ => {
                    let u = this.props.getCurrentToken()
                    u && resolve(u)

                    setTimeout(loop, 100)
                }
                loop()
            })

            let {
                currentOrganizationUserApi: {
                    subscribeById: subscribeUserById,
                },
                currentOrganizationFixedPhraseApi: {
                    subscribe: subscribeOrganizationFixedPhrase
                },
                currentUserFixedPhraseApi: {
                    subscribe: subscribeUserFixedPhrase
                },
                currentSiteApi: {
                    subscribe: subscribeSite
                },
                currentVisitorApi: {
                    update: updateVisitor,
                    subscribeByChild: subscribeVisitorByChild
                },
                currentVisitorGeneralApi: {
                    update: updateVisitorGeneral
                },
                currentVisitorReadTimeApi: {
                    update: updateVisitorReadTime
                },
                getCurrentUserId,
                soundApi: {
                    read: readSound,
                }
            } = this.props

            let onOrganizationFixedPhrasesChanged = organizationFixedPhrases => this.setState({organizationFixedPhrases})
            let onUserChanged = user => this.setState({user})
            let onUserFixedPhrasesChanged = userFixedPhrases => this.setState({userFixedPhrases})
            let onSiteChanged = sites =>
                this.setState({
                    activeSites: sites.filter(s => s.enabled),
                    defaultSite: sites.find(s => s.defaulted),
                    sites
                })

            let onVisitorChanged = async visitors => {

                let connections = this.state.connections
                
                await setState(
                    this,
                    {
                        connections: this.state.connections
                            .map(([x, timeoutId]) => [
                                visitors.find(y => y.id == x.id) || x,
                                visitors.some(y => y.id == x.id) ? (
                                    timeoutId
                                 && clearInterval(timeoutId)
                                )
                              :                                    (
                                    timeoutId
                                 || setTimeout(
                                        _ => this.setState({
                                            connections: this.state.connections.filter(([y]) => y.id != x.id),
                                            activeVisitorIds: this.state.activeVisitorIds.filter(y => y != x.id),
                                            dialogVisitorId: (
                                                this.state.dialogVisitorId == x.id ? undefined
                                              :                                      this.state.dialogVisitorId
                                            )
                                        }),
                                        180000
                                    )
                                )
                            ])
                            .concat(
                                visitors
                                    .filter(a => this.state.connections.every(([y]) => y.id != a.id))
                                    .map(a => [
                                        a,
                                        undefined
                                    ])
                            )
                    }
                )


                visitors
                    .map(x => [connections.map(([c]) => c).find((y) => y.id == x.id), x])
                    .map(async ([prev, next]) => {
                        if (prev) {
                            if (prev.general.messages.length < next.general.messages.length) {
                                let is_first = prev.general.messages.length == 0
            
                                window.Notification && notification(
                                    new Notification(
                                        is_first ? "新規メッセージ受信 - Familiar Chat"
                                      :            "メッセージ受信 - Familiar Chat",
                                        {
                                            body: (
                                                (next.name || next.general.name)
                                              + " : "
                                              + (next.general.messages[next.general.messages.length - 1].text || "新規メッセージがあります。")
                                            ),
                                            icon: "/img/familiar-notification.png",
                                            badge: "chat"
                                        }
                                    )
                                )
            
                                let site = this.state.activeSites.find(
                                    s => s.hostname == (next.general.location || {}).pathname
                                )
            
                                let sound = this.state.sounds.find(s =>
                                    site ? (
                                        is_first ? site.notification.first_message_recieved.sound_id == s.id
                                      :            site.notification.message_recieved.sound_id == s.id
                                    )
                                  :        this.state.defaultSite.notification.message_recieved.sound_id == s.id
                                )
                                if (sound) {
                                    let audioElement = document.createElement("audio")
                                    audioElement.src = sound.url
                                    audioElement.play()
                                }

                                if(this.state.selectedVisitorIds.some(x=> x == next.id))
                                    if(!document.hidden)
                                        await this.state.updateOperatorReadTime({
                                            visitorId: next.id,
                                            userId: getCurrentUserId()
                                        })
                                    else {
                                        let fun = async() => {
                                            if(!document.hidden) {
                                                await this.state.updateOperatorReadTime({
                                                    visitorId: next.id,
                                                    userId: getCurrentUserId()
                                                })
                                                document.removeEventListener("visibilitychange", fun, false)
                                            }
                                        }
                                        document.addEventListener(
                                            "visibilitychange",
                                            fun,
                                            false
                                        )
                                    }
                                
                            }
                        } else {
                            window.Notification && notification(new Notification(
                                "訪問者 - Familiar Chat",
                                {
                                    body: "訪問者: " + (next.name || next.general.name || "anonymous"),
                                    icon: "/img/familiar-notification.png"
                                }
                            ))

                            let site = this.state.activeSites.find(
                                s => s.hostname == (next.general.location || {}).pathname
                            )
            
                            let sound = this.state.sounds.find(s =>
                                site ? (
                                    is_first ? site.notification.first_message_recieved.sound_id == s.id
                                  :            site.notification.message_recieved.sound_id == s.id
                                )
                              :        this.state.defaultSite.notification.message_recieved.sound_id == s.id
                            )

                            if (sound) {
                                let audioElement = document.createElement("audio")
                                audioElement.src = sound.url
                                audioElement.play()
                            }
                        }
                    })
                
            }

            this.setState({
                sounds: await readSound(),
                subscribeCertificateOrganizationFixedPhrase: await subscribeOrganizationFixedPhrase({
                    subscriber: onOrganizationFixedPhrasesChanged
                }),
                subscribeCertificateUser: await subscribeUserById({
                    subscriber: onUserChanged
                }),
                subscribeCertificateUserFixedPhrase: await subscribeUserFixedPhrase({
                    subscriber: onUserFixedPhrasesChanged
                }),
                subscribeCertificateSite: await subscribeSite({
                    subscriber: onSiteChanged
                }),
                subscribeCertificateVisitor: await subscribeVisitorByChild({
                    child     : "connected_count",
                    startAt   : 1,
                    subscriber: onVisitorChanged,
                }),
                updateOperatorReadTime: async ({
                    visitorId, 
                    userId
                }) => {
                    let timestamp = new Date().getTime()
                    await updateVisitorReadTime({
                        visitor: {
                            id: visitorId
                        },
                        read_time: {
                            id : userId,
                            read_date: timestamp
                        }
                    })
                
                    await updateVisitorGeneral({
                        visitor: {
                            id: visitorId
                        },
                        general: {
                            operator_read_time: timestamp
                        }
                    })
                },
                visitorSelect: async visitorId => {
                    this.setState({
                        selectedVisitorIds:
                            this.state.selectedVisitorIds
                                .concat(visitorId)
                                .sort((a, b) =>
                                    a < b ? -1
                                : a > b ?  1
                                : 0
                                ),
                        activeVisitorIds:
                            this.state.activeVisitorIds
                                .concat(visitorId)
                                .sort((a, b) =>
                                    a < b ? -1
                                : a > b ?  1
                                : 0
                                )
                    })
                    await this.state.updateOperatorReadTime({
                        visitorId: visitorId,
                        userId: getCurrentUserId()
                    })
                }
            })
        })()
    }

    componentWillUnmount() {
        let {
            currentOrganizationUserApi: {
                unsubscribe: unsubscribeUser
            },
            currentOrganizationFixedPhraseApi: {
                unsubscribe: unsubscribeOrganizationFixedPhrase
            },
            currentSiteApi: {
                unsubscribe: unsubscribeSite
            },
            currentUserFixedPhraseApi: {
                unsubscribe: unsubscribeUserFixedPhrase
            },
            currentVisitorApi: {
                unsubscribe: unsubscribeVisitor
            },
        } = this.props

        if (this.state.subscribeCertificateOrganizationFixedPhrase)
            unsubscribeOrganizationFixedPhrase(this.state.subscribeCertificateOrganizationFixedPhrase)

        if (this.state.subscribeCertificateSite)
            unsubscribeSite(this.state.subscribeCertificateSite)

        if (this.state.subscribeCertificateUserFixedPhrase)
            unsubscribeUserFixedPhrase(this.state.subscribeCertificateUserFixedPhrase)

        if (this.state.subscribeCertificateUser)
            unsubscribeUser(this.state.subscribeCertificateUser)

        if (this.state.subscribeCertificateVisitor)
            unsubscribeVisitor(this.state.subscribeCertificateVisitor)

    }

    render() {
        let {
            children,
            currentVisitorCorrespondingUserApi,
            currentOrganizationUserApi,
            currentVisitorApi,
            currentVisitorMessageApi,
            currentVisitorReceivedMessageApi,
            currentVisitorReceivedMessageImageApi,
            currentVisitorTriggerMessageApi,
            currentDocumentImageApi,
            getCurrentUserId,
            getCurrentOrganizationId,
            getCurrentToken,
            tokenApi,
            location,
            ...props
        } = this.props
       
        if (getCurrentToken()) {
            if (/\/sign_in/.test(location.pathname))
                return (
                    <Redirect
                        to={(location.state && location.state.from) || "/"}
                    />
                )
        } else {
            if (/\/sign_in/.test(location.pathname))
                return React.cloneElement(
                    children,
                    {
                        location: location,
                        tokenApi: tokenApi,
                        ...props,
                        ...children.props
                    }
                )
            else
                return (
                    <Redirect
                        to={{
                            pathname: "/sign_in",
                            state: {
                                from: location
                            }
                        }}
                    />
                )
        }


        if(getCurrentUserId() == undefined || getCurrentOrganizationId() == undefined)
            return null

        let visitors = sortOnId(this.state.connections.map(([v]) => v).filter(x => x))

        return (
            <div
                className={classNames.Host}
            >
                <Header
                    userApi={currentOrganizationUserApi}
                    signOut={async _ => await tokenApi.delete()}
                    onNavigationButtonClick={e =>
                        this.setState({
                            navigationBarIsVisible: !this.state.navigationBarIsVisible
                        })
                    }
                    user={this.state.user}
                />
                <div
                    className={classNames.Content}
                >
                    <NavigationBar
                        visible={this.state.navigationBarIsVisible}
                        location={location}
                    />
                    {[<main
                        className={classNames.Main}
                        key={
                            "/users/"
                            + getCurrentUserId()
                            + "/organizations/"
                            + getCurrentOrganizationId()
                        }
                    >
                        {React.cloneElement(
                            children,
                            {
                                currentOrganizationUserApi,
                                currentVisitorApi,
                                currentVisitorCorrespondingUserApi,
                                currentVisitorMessageApi,
                                currentVisitorReceivedMessageApi,
                                currentVisitorTriggerMessageApi,
                                currentDocumentImageApi,
                                getCurrentUserId,
                                getCurrentOrganizationId,
                                getCurrentToken,
                                organizationFixedPhrases  : this.state.organizationFixedPhrases,
                                tokenApi,
                                location,
                                selectedVisitorIds        : this.state.selectedVisitorIds,
                                sites                     : this.state.sites,
                                visitors                  : visitors,
                                sounds                    : this.state.sounds,
                                user                      : this.state.user,
                                userFixedPhrases          : this.state.userFixedPhrases,
                                visitorSelect             : this.state.visitorSelect,
                                visitorDeselect           : this.state.visitorDeselect,
                                ...props,
                                ...children.props
                            }
                        )}
                    </main>]}
                </div>
                <Root
                    className={classNames.ChatContent}
                >
                    <div
                        className={classNames.WidgetWrapper}
                    >
                        {visitors
                            .filter(x => this.state.activeVisitorIds.includes(x.id))
                            .map(x =>
                                <ChatWidget
                                    correspondingUserApi={currentVisitorCorrespondingUserApi}
                                    className={classNames.ChatWidget}
                                    documentImageApi={currentDocumentImageApi}
                                    getCurrentUserId={getCurrentUserId}
                                    key={x.id}
                                    onClose={_ =>
                                        this.setState({
                                            activeVisitorIds: this.state.activeVisitorIds.filter(y => y != x.id)
                                        }
                                    )}
                                    onExpand={_ =>
                                        this.setState({
                                            dialogVisitorId: x.id
                                        })
                                    }
                                    organizationFixedPhrases={this.state.organizationFixedPhrases}
                                    user={this.state.user}
                                    userFixedPhrases={this.state.userFixedPhrases}
                                    visitor={x}
                                    visitorDeselect={this.state.visitorDeselect}
                                    visitorMessageApi={currentVisitorMessageApi}
                                    visitorReceivedMessageApi={currentVisitorReceivedMessageApi}
                                    visitorReceivedMessageImageApi={currentVisitorReceivedMessageImageApi}
                                    visitorTriggerMessageApi={currentVisitorTriggerMessageApi}
                                />
                            )
                        }
                    </div>
                    <div
                        className={classNames.FABWrapper}
                        onMouseOver={_ => !this.state.isLockVisibleVisitorFAB && this.setState({visibleVisitorFAB: true})}
                        onMouseOut={_ => !this.state.isLockVisibleVisitorFAB && this.setState({visibleVisitorFAB: false})}
                    >
                        {visitors.filter(x => this.state.selectedVisitorIds.includes(x.id))
                            .map(x =>
                                <FloatingActionButton
                                    className={
                                        [
                                            classNames.FAB,
                                            classNames.WidgetFAB,
                                            this.state.activeVisitorIds.includes(x.id) ? classNames.ActiveWidgetFAB
                                          :                                              classNames.DisableWidgetFAB,
                                            this.state.visibleVisitorFAB ? classNames.ViewWidgetFAB
                                          :                                classNames.HiddenWidgetFAB
                                        ].join(" ")
                                    }
                                    component={Shadow}
                                    offset={6}
                                    key={x.id}
                                    onClick={e => {
                                        this.setState({
                                            activeVisitorIds: (
                                                this.state.activeVisitorIds.includes(x.id) ? this.state.activeVisitorIds.filter(y => y != x.id)
                                              :                                              this.state.activeVisitorIds.concat(x.id)
                                            )
                                        })
                                    }}
                                    type="fab"
                                >
                                    <MaterialIcon
                                        className={classNames.FABVisitorName}
                                    >
                                        person
                                    </MaterialIcon>
                                </FloatingActionButton>
                        )}
                        <FloatingActionButton
                            onClick={e =>
                                this.setState({
                                    isLockVisibleVisitorFAB: !this.state.isLockVisibleVisitorFAB
                                })
                            }
                            className={
                                [
                                    classNames.FAB,
                                    classNames.MainFAB
                                ].join(" ")
                            }
                        >
                            <MaterialIcon
                                className={
                                    this.state.isLockVisibleVisitorFAB ? classNames.LockFABIcon
                                  :                                      classNames.FABIcon
                                }
                            >
                                {this.state.isLockVisibleVisitorFAB ? "forum" : "chat_bubble"}
                            </MaterialIcon>
                        </FloatingActionButton>
                    </div>
                </Root>
                <WidgetDialog
                    correspondingUserApi={currentVisitorCorrespondingUserApi}
                    documentImageApi={currentDocumentImageApi}
                    getCurrentUserId={getCurrentUserId}
                    onCancel={_ =>
                        this.setState({
                            dialogVisitorId: undefined
                        })
                    }
                    organizationFixedPhrases={this.state.organizationFixedPhrases}
                    user={this.state.user}
                    userFixedPhrases={this.state.userFixedPhrases}
                    visible={this.state.dialogVisitorId}
                    visitor={this.state.dialogVisitorId && visitors.find(x => x.id == this.state.dialogVisitorId)}
                    visitorApi={currentVisitorApi}
                    visitorDeselect={this.state.visitorDeselect}
                    visitorMessageApi={currentVisitorMessageApi}
                    visitorReceivedMessageApi={currentVisitorReceivedMessageApi}
                    visitorReceivedMessageImageApi={currentVisitorReceivedMessageImageApi}
                    visitorTriggerMessageApi={currentVisitorTriggerMessageApi}
                />
                <Dialog
                    visible={this.state.isInvalidationToken}
                >
                    <DialogHeader>
                        他のデバイスからのログインを検知しました。
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={async _ => await tokenApi.delete()}
                        >
                            ホーム画面へ
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        )
    }
}
