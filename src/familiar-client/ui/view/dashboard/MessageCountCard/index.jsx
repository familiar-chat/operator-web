import React       from "react"
import LabeledList from "familiar-client/ui/view/common/LabeledList"
import LabeledItem from "familiar-client/ui/view/common/LabeledItem"
import DashboardCard from "familiar-client/ui/view/dashboard/DashboardCard"

import classNames from "familiar-client/ui/view/dashboard/MessageCountCard/classNames"

export default ({
    visitors = [],
    className,
    ...props
}) =>
    <DashboardCard
        title="発言数"
        className={classNames.Host}
    >
        <LabeledList>
            <LabeledItem
                label={"訪問者発言数"}
                value={visitors.map(v => v.general.messages.length).reduce((p, c) => p + c, 0)}
            />
            <LabeledItem
                label={"オペレーター発言数"}
                value={visitors.map(v => v.general.received_messages.length).reduce((p, c) => p + c, 0)}
            />
            <LabeledItem
                label={"トリガー発言数"}
                value={visitors.map(v => v.general.trigger_messages.length).reduce((p, c) => p + c, 0)}
            />
        </LabeledList>
    </DashboardCard>
