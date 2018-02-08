import React           from "react"
import queryString     from "query-string"
import Page            from "familiar-client/ui/view/common/Page"
import PageTitle       from "familiar-client/ui/view/common/PageTitle"
import ChatManager     from "familiar-client/ui/view/chat/ChatManager"
import Shadow          from "react-material/ui/effect/Shadow"
import Tab             from "react-material/ui/view/Tab"
import TabBar          from "react-material/ui/view/TabBar"
import ViewPager       from "react-material/ui/view/ViewPager"

export default ({
    className,
    currentVisitorApi,
    currentVisitorCorrespondingUserApi,
    getCurrentUserId = _ => undefined,
    visitors = [],
    selectedVisitorIds = [],
    visitorSelect = visitorId => undefined,
    visitorDeselect = visitorId => undefined,
    ...props
}) =>
    <Page>
        <Shadow>
            <PageTitle
                title="チャット"
                description="訪問者とのチャットを行えます。"
            />
            <TabBar
                location={location}
            >
                <Tab
                    to={{
                        pathname: "/chat",
                        search: "?tab_index=0"
                    }}
                >
                    全体訪問者
                </Tab>
                <Tab
                    to={{
                        pathname: "/chat",
                        search: "?tab_index=1"
                    }}
                >
                    発言訪問者
                </Tab>
            </TabBar>
        </Shadow>
        <ViewPager
            selectedIndex={queryString.parse(location.search)["tab_index"] || 0}
        >
            <ChatManager
                getCurrentUserId={getCurrentUserId}
                selectedVisitorIds={selectedVisitorIds}
                visitorApi={currentVisitorApi}
                visitors={visitors}
                visitorSelect={visitorSelect}
                visitorDeselect={visitorDeselect}
            />
            <ChatManager
                getCurrentUserId={getCurrentUserId}
                selectedVisitorIds={selectedVisitorIds}
                visitorApi={currentVisitorApi}
                visitors={visitors.filter(v => !v.general.messages.length == 0)}
                visitorSelect={visitorSelect}
                visitorDeselect={visitorDeselect}
            />
        </ViewPager>
    </Page>
    
