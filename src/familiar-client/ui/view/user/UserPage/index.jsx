import React               from "react"
import queryString         from "query-string"
import Page                from "familiar-client/ui/view/common/Page"
import PageTitle           from "familiar-client/ui/view/common/PageTitle"
import UserManager         from "familiar-client/ui/view/user/UserManager"
import Shadow              from "react-material/ui/effect/Shadow"
import Tab                 from "react-material/ui/view/Tab"
import TabBar              from "react-material/ui/view/TabBar"
import ViewPager           from "react-material/ui/view/ViewPager"

export default ({
    credentialApi,
    currentOrganizationUserApi,
    currentUserImageApi,
    getCurrentUserId,
    user,
    ...props
}) =>
    <Page>
        <Shadow>
            <PageTitle
                title="オペレーター"
                description="プロフィール画像や表示名などの個人設定を変更できます。"
            />
            <TabBar
                location={location}
            >
                <Tab
                    to={{
                        pathname: "/settings/user",
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
            <UserManager
                credentialApi={credentialApi}
                user={user}
                userApi={currentOrganizationUserApi}
                userImageApi={currentUserImageApi}
                getUserId={getCurrentUserId}
            />
        </ViewPager>
    </Page>
    
