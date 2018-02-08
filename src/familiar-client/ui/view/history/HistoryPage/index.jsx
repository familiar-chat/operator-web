import React           from "react"
import queryString     from "query-string"
import Page            from "familiar-client/ui/view/common/Page"
import HistoryManager  from "familiar-client/ui/view/history/HistoryManager"
import PageTitle       from "familiar-client/ui/view/common/PageTitle"
import Shadow          from "react-material/ui/effect/Shadow"
import Tab             from "react-material/ui/view/Tab"
import TabBar          from "react-material/ui/view/TabBar"
import ViewPager       from "react-material/ui/view/ViewPager"

export default ({
    currentVisitorApi,
    ...props
}) =>
    <Page>
        <Shadow>
            <PageTitle
                title="履歴"
                description="チャット履歴の確認を行えます。"
            />
            <TabBar
                location={location}
            >
                <Tab
                    to={{
                        pathname: "/history",
                        search: "?tab_index=0"
                    }}
                >
                    プロフィール
                </Tab>
            </TabBar>
        </Shadow>
        <ViewPager
            selectedIndex={queryString.parse(location.search)["tab_index"] || 0}
        >
            <HistoryManager
                visitorApi={currentVisitorApi}
            />
        </ViewPager>
    </Page>
    
