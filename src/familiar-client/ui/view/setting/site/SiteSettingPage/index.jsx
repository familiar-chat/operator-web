import React              from "react"
import queryString        from "query-string"
import Page               from "familiar-client/ui/view/common/Page"
import PageTitle          from "familiar-client/ui/view/common/PageTitle"
import SetupManager       from "familiar-client/ui/view/setting/site/SetupManager"
import SiteManager        from "familiar-client/ui/view/setting/site/SiteManager"
import Shadow             from "react-material/ui/effect/Shadow"
import Tab                from "react-material/ui/view/Tab"
import TabBar             from "react-material/ui/view/TabBar"
import ViewPager          from "react-material/ui/view/ViewPager"

export default ({
    currentSiteApi,
    currentSiteImageApi,
    getCurrentOrganizationId,
    sites,
    sounds,
    ...props
}) =>
    <Page>
        <Shadow>
            <PageTitle
                title="サイト別設定"
                description="サイト別に各種設定を行えます。"
            />
            <TabBar
                location={location}
            >
                <Tab
                    to={{
                        pathname: "/settings/site",
                        search: "?tab_index=0"
                    }}
                >
                    サイト
                </Tab>
                <Tab
                    to={{
                        pathname: "/settings/site",
                        search: "?tab_index=1"
                    }}
                >
                    セットアップ
                </Tab>
            </TabBar>
        </Shadow>
        <ViewPager
            selectedIndex={queryString.parse(location.search)["tab_index"] || 0}
        >
            <SiteManager
                siteApi={currentSiteApi}
                siteImageApi={currentSiteImageApi}
                sites={sites}
                sounds={sounds}
            />
            <SetupManager
                getCurrentOrganizationId={getCurrentOrganizationId}
            />
        </ViewPager>
    </Page>
