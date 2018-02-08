import React              from "react"
import Page               from "familiar-client/ui/view/common/Page"
import PageTitle          from "familiar-client/ui/view/common/PageTitle"
import TriggerManager     from "familiar-client/ui/view/setting/trigger/TriggerManager"
import queryString        from "query-string"
import Shadow             from "react-material/ui/effect/Shadow"
import Tab                from "react-material/ui/view/Tab"
import TabBar             from "react-material/ui/view/TabBar"
import ViewPager          from "react-material/ui/view/ViewPager"

export default ({
    currentDocumentImageApi,
    currentOrganizationTriggerApi,
    currentTriggerApi,
    tokenApi,
    ...props
}) =>
    <Page>
        <Shadow>
            <PageTitle
                title="自動対応"
                description="特定の条件にマッチした場合の処理を設定できます。"
            />
            <TabBar
                location={location}
            >
                <Tab
                    to={{
                        pathname: "/settings/trigger",
                        search: "?tab_index=0"
                    }}
                >
                    トリガー
                </Tab>
            </TabBar>
        </Shadow>
        <ViewPager
            selectedIndex={queryString.parse(location.search)["tab_index"] || 0}
        >
            <TriggerManager
                triggerApi={currentTriggerApi}
                documentImageApi={currentDocumentImageApi}
            />
        </ViewPager>
    </Page>