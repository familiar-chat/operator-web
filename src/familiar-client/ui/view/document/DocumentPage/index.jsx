import React            from "react"
import queryString      from "query-string"
import Page             from "familiar-client/ui/view/common/Page"
import PageTitle        from "familiar-client/ui/view/common/PageTitle"
import DocumentManager  from "familiar-client/ui/view/document/DocumentManager"
import Shadow           from "react-material/ui/effect/Shadow"
import Tab              from "react-material/ui/view/Tab"
import TabBar           from "react-material/ui/view/TabBar"
import ViewPager        from "react-material/ui/view/ViewPager"

export default ({
    currentDocumentImageApi,
    ...props
}) =>
    <Page>
        <Shadow>
            <PageTitle
                title="ドキュメント"
                description="メッセージ送信に使用される画像を登録できます。"
            />
            <TabBar
                location={location}
            >
                <Tab
                    to={{
                        pathname: "/document",
                        search: "?tab_index=0"
                    }}
                >
                    画像
                </Tab>
            </TabBar>
        </Shadow>
        <ViewPager
            selectedIndex={queryString.parse(location.search)["tab_index"] || 0}
        >
            <DocumentManager
                documentImageApi={currentDocumentImageApi}
            />
        </ViewPager>
    </Page>
