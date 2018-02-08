import React       from "react"
import Page        from "familiar-client/ui/view/common/Page"
import PageTitle   from "familiar-client/ui/view/common/PageTitle"
import UserManager from "familiar-client/ui/view/iam/UserManager"
import Shadow      from "react-material/ui/effect/Shadow"
import Tab         from "react-material/ui/view/Tab"
import TabBar      from "react-material/ui/view/TabBar"
import ViewPager   from "react-material/ui/view/ViewPager"

export default ({
    credentialApi:{
        createUserWithEmailAndPassword
    },
    currentOrganizationUserApi,
    currentUserOrganizationApi,
    location,
    organizationUsers = [],
    getCurrentOrganizationId = _ => undefined,
    ...props
}) =>
    <Page>
        <Shadow>
            <PageTitle
                description="オペレーターの管理ができます。"
                title="管理"
            />
            <TabBar
                location={location}
            >
                <Tab
                    to={{
                        pathname: "/iam",
                        search: "?tab_index=0"
                    }}
                >
                    オペレーター
                </Tab>
            </TabBar>
        </Shadow>
        <ViewPager
            selectedIndex={location.search["tab_index"] || 0}
        >
            <UserManager
                createUserWithEmailAndPassword={createUserWithEmailAndPassword}
                getCurrentOrganizationId={getCurrentOrganizationId}
                organizationUserApi={currentOrganizationUserApi}
                userOrganizationApi={currentUserOrganizationApi}
            />
        </ViewPager>
    </Page>
