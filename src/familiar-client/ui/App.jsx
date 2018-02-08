import ErrorListener           from "familiar-client/ui/view/ErrorListener"
import MainLayout              from "familiar-client/ui/view/MainLayout"
import SignInPage              from "familiar-client/ui/view/auth/SignInPage"
import ChatPage                from "familiar-client/ui/view/chat/ChatPage"
import DashboardPage           from "familiar-client/ui/view/dashboard/DashboardPage"
import DocumentPage            from "familiar-client/ui/view/document/DocumentPage"
import FixedPhrasePage         from "familiar-client/ui/view/fixed_phrase/FixedPhrasePage"
import HistoryPage             from "familiar-client/ui/view/history/HistoryPage"
import IamPage                 from "familiar-client/ui/view/iam/IamPage"
import UserPage                from "familiar-client/ui/view/user/UserPage"
import CalendarSettingPage     from "familiar-client/ui/view/setting/calendar/CalendarSettingPage"
import TriggerSettingPage      from "familiar-client/ui/view/setting/trigger/TriggerSettingPage"
import OrganizationSettingPage from "familiar-client/ui/view/setting/organization/OrganizationSettingPage"
import SiteSettingPage         from "familiar-client/ui/view/setting/site/SiteSettingPage"
import DatabaseApi             from "familiar-client/ui/wrapper/DatabaseApi"
import TokensApi               from "familiar-client/ui/wrapper/auth/TokenApi"
import React                   from "react"
import {Route}                 from "react-router"
import {Switch}                from "react-router"
import {withRouter}            from "react-router"
import {BrowserRouter}         from "react-router-dom"

let Root = withRouter(
    props =>
        <TokensApi
            render={props =>
                <DatabaseApi
                    render={props =>
                        <MainLayout
                            {...props}
                        />
                    }
                    {...props}
                />
            }
            {...props}
        />
)

let ComposingRoute = ({
    component,
    Component = component,
    path,
    ...props
}) =>
    <Route
        path={path}
        render={x => <Component {...x} {...props} />}
    />

let ComposingSwitch = ({
    children,
    ...props
}) =>
    <Switch>
        {React.Children.toArray(children).map(
            x => React.cloneElement(
                x,
                {
                    ...props,
                    ...x.props
                }
            )
        )}
    </Switch>

export default props =>
    <BrowserRouter
        {...props}
    >
        <ErrorListener>
            <Root>
                <ComposingSwitch>
                    <ComposingRoute
                        exact
                        path="/"
                        component={ChatPage}
                    />
                    <ComposingRoute
                        path="/chat"
                        component={ChatPage}
                    />
                    <ComposingRoute
                        path="/dashboard"
                        component={DashboardPage}
                    />
                    <ComposingRoute
                        path="/document"
                        component={DocumentPage}
                    />
                    <ComposingRoute
                        path="/fixed_phrases"
                        component={FixedPhrasePage}
                    />
                    <ComposingRoute
                        path="/history"
                        component={HistoryPage}
                    />
                    <ComposingRoute
                        path="/iam"
                        component={IamPage}
                    />
                    <ComposingRoute
                        path="/user"
                        component={UserPage}
                    />
                    <ComposingRoute
                        path="/settings/calendar"
                        component={CalendarSettingPage}
                    />
                    <ComposingRoute
                        path="/settings/organization"
                        component={OrganizationSettingPage}
                    />
                    <ComposingRoute
                        path="/settings/site"
                        component={SiteSettingPage}
                        exact
                    />
                    <ComposingRoute
                        path="/settings/trigger"
                        component={TriggerSettingPage}
                    />
                    <ComposingRoute
                        path="/sign_in"
                        component={SignInPage}
                    />
                </ComposingSwitch>
            </Root>
        </ErrorListener>
    </BrowserRouter>
