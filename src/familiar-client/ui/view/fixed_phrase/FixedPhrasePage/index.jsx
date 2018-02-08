import React              from "react"
import queryString        from "query-string"
import Page               from "familiar-client/ui/view/common/Page"
import PageTitle          from "familiar-client/ui/view/common/PageTitle"
import FixedPhraseManager from "familiar-client/ui/view/fixed_phrase/FixedPhraseManager"
import Shadow             from "react-material/ui/effect/Shadow"
import Tab                from "react-material/ui/view/Tab"
import TabBar             from "react-material/ui/view/TabBar"
import ViewPager          from "react-material/ui/view/ViewPager"

export default ({
    currentOrganizationFixedPhraseApi,
    currentUserFixedPhraseApi,
    organizationFixedPhrases,
    tokenApi,
    userFixedPhrases = [],
    ...props
}) =>
    <Page>
        <Shadow>
            <PageTitle
                title="定型文設定"
                description="チャット対応中、使用頻度の高い文章を定型文として登録できます。"
            />
            <TabBar
                location={location}
            >
                <Tab
                    to={{
                        pathname: "/fixed_phrases",
                        search: "?tab_index=0"
                    }}
                >
                    個人
                </Tab>
                <Tab
                    to={{
                        pathname: "/fixed_phrases",
                        search: "?tab_index=1"
                    }}
                >
                    組織
                </Tab>
            </TabBar>
        </Shadow>
        <ViewPager
            selectedIndex={queryString.parse(location.search)["tab_index"] || 0}
        >
            <FixedPhraseManager
                fixedPhraseApi={currentUserFixedPhraseApi}
                fixedPhrases={userFixedPhrases}
            />
            <FixedPhraseManager
                fixedPhraseApi={currentOrganizationFixedPhraseApi}
                fixedPhrases={organizationFixedPhrases}
            />
        </ViewPager>
    </Page>
