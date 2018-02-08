import React               from "react"
import Page                from "familiar-client/ui/view/common/Page"
import PageTitle           from "familiar-client/ui/view/common/PageTitle"
import CalendarManager     from "familiar-client/ui/view/setting/calendar/CalendarManager"
import Shadow              from "react-material/ui/effect/Shadow"
import Tab                 from "react-material/ui/view/Tab"
import TabBar              from "react-material/ui/view/TabBar"

export default ({
    location,
    currentCalendarApi,
    ...props
}) =>
    <Page>
        <Shadow>
            <PageTitle
                title="営業時間設定"
                description="ウィジェットの表示時間を設定できます。"
            />
            <TabBar
                location={location}
            >
                <Tab
                    to={{
                        pathname: "/settings/calendar",
                        search: "?tab_index=0"
                    }}
                >
                    営業時間
                </Tab>
            </TabBar>
        </Shadow>
        <CalendarManager
            calendarApi={currentCalendarApi}
        />
    </Page>
