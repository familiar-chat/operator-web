import React                               from "react"
import bind                                from "api-common/api/bind"
import * as organizationApi                from "api-common/api/organization"
import * as organizationInformationApi     from "api-common/api/organization/information"
import * as calendarApi                    from "api-common/api/organization/calendar"
import * as documentImageApi               from "api-common/api/organization/document/image"
import * as organizationFixedPhraseApi     from "api-common/api/organization/fixed_phrase"
import * as siteApi                        from "api-common/api/organization/site"
import * as siteImageApi                   from "api-common/api/organization/site/image"
import * as triggerApi                     from "api-common/api/organization/trigger"
import * as organizationUserApi            from "api-common/api/organization/user"
import * as userFixedPhraseApi             from "api-common/api/organization/user/fixed_phrase"
import * as userImageApi                   from "api-common/api/organization/user/image"
import * as visitorApi                     from "api-common/api/organization/visitor"
import * as visitorReadTimeApi             from "api-common/api/organization/visitor/read_time"
import * as visitorGeneralApi              from "api-common/api/organization/visitor/general"
import * as visitorCorrespondingUserApi    from "api-common/api/organization/visitor/corresponding_user"
import * as visitorMessageApi              from "api-common/api/organization/visitor/general/message"
import * as visitorReceivedMessageApi      from "api-common/api/organization/visitor/general/received_message"
import * as visitorReceivedImageMessageApi from "api-common/api/organization/visitor/general/received_message/image"
import * as visitorTriggerMessageApi       from "api-common/api/organization/visitor/general/trigger_message"
import * as soundApi                       from "api-common/api/sound"
import * as userOrganizationApi            from "api-common/api/user/organization"
import config                              from "api-common/config"

export default class extends React.Component {

    componentWillMount() {
        this.setState({
            tokenSubscribeCertificate: undefined
        })
    }

    componentDidMount() {
        ;(async _ => {
            let {
                tokenApi: {
                    subscribe: subscribe
                }
            } = this.props

            let onChangeToken = async token => {

                let organizations = (
                    token ? await userOrganizationApi.read({
                        token: token,
                        user : {
                            id: token.user.uid
                        }
                    })
                  :         []
                )

                this.setState({
                    currentOrganizationId: organizations[0] && organizations[0].id,
                    currentToken: token,
                    currentUserId: organizations[0] && organizations[0].user_id
                })
            }

            this.setState({
                tokenSubscribeCertificate: await subscribe(onChangeToken)
            })
        })()
    }

    componentWillUnmount() {
        let {
            tokenApi: {
                unsubscribe: unsubscribe
            }
        } = this.props

        if (this.state.tokenSubscribeCertificate)
            unsubscribe(this.state.tokenSubscribeCertificate)
    }

    render() {
        let {
            render,
            ...props
        } = this.props
        
        return render({
            getCurrentOrganizationId: _ => this.state.currentOrganizationId,
            getCurrentToken: _ => this.state.currentToken,
            getCurrentUserId: _ => this.state.currentUserId,
            setCurrentOrganizationId: x => this.setState({
                currentOrganizationId: x
            }),
            setCurrentToken: x => this.setState({
                currentToken: x
            }),
            soundApi: bind(soundApi, {
                token: this.state.currentToken
            }),
            currentOrganizationApi: bind(organizationApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentOrganizationInformationApi: bind(organizationInformationApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentOrganizationUserApi: bind(organizationUserApi,{
                organization: {
                    id: this.state.currentOrganizationId
                },
                user: {
                    id: this.state.currentUserId
                },
                token: this.state.currentToken
            }),
            currentCalendarApi: bind(calendarApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentDocumentImageApi: bind(documentImageApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken,
                url  : config.familiar.functions.url,                
            }),
            currentOrganizationFixedPhraseApi: bind(organizationFixedPhraseApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentSiteApi: bind(siteApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentSiteImageApi: bind(siteImageApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                url  : config.familiar.functions.url,
                token: this.state.currentToken
            }),
            currentTriggerApi: bind(triggerApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentVisitorApi: bind(visitorApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentVisitorReadTimeApi: bind(visitorReadTimeApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentVisitorGeneralApi: bind(visitorGeneralApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentVisitorCorrespondingUserApi: bind(visitorCorrespondingUserApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken     
            }),
            currentVisitorReceivedMessageApi: bind(visitorReceivedMessageApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentVisitorReceivedMessageImageApi: bind(visitorReceivedImageMessageApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                url : config.familiar.functions.url,
                visitor: {
                    id: this.state.currentUserId
                },
                token: this.state.currentToken
            }),
            currentVisitorMessageApi: bind(visitorMessageApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentVisitorTriggerMessageApi: bind(visitorTriggerMessageApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                token: this.state.currentToken
            }),
            currentUserFixedPhraseApi: bind(userFixedPhraseApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                user: {
                    id: this.state.currentUserId
                },
                token: this.state.currentToken
            }),
            currentUserImageApi: bind(userImageApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                url  : config.familiar.functions.url,
                user: {
                    id: this.state.currentUserId
                },
                token: this.state.currentToken
            }),
            currentUserOrganizationApi: bind(userOrganizationApi, {
                organization: {
                    id: this.state.currentOrganizationId
                },
                user: {
                    id: this.state.currentUserId
                },
                token: this.state.currentToken
            }),
            ...props
        })
    }
}
