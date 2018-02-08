import React               from "react"
import queryString         from "query-string"
import Page                from "familiar-client/ui/view/common/Page"
import PageTitle           from "familiar-client/ui/view/common/PageTitle"
import OrganizationManager from "familiar-client/ui/view/setting/organization/OrganizationManager"
import Shadow              from "react-material/ui/effect/Shadow"
import Tab                 from "react-material/ui/view/Tab"
import TabBar              from "react-material/ui/view/TabBar"
import ViewPager           from "react-material/ui/view/ViewPager"

export default ({
    currentOrganizationInformationApi,
    soundApi,
    ...props
}) =>
    <Page>
        <Shadow>
            <PageTitle
                title="組織設定"
                description="組織の各種設定を行えます。"
            />
            <TabBar
                location={location}
            >
                <Tab
                    to={{
                        pathname: "/settings/organization",
                        search: "?tab_index=0"
                    }}
                >
                    組織
                </Tab>
            </TabBar>
        </Shadow>
        <ViewPager
            selectedIndex={queryString.parse(location.search)["tab_index"] || 0}
        >
            <OrganizationManager
                organizationInformationApi={currentOrganizationInformationApi}
            />
        </ViewPager>
    </Page>
    