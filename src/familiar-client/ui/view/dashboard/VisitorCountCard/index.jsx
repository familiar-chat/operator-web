import React         from "react"
import LabeledList   from "familiar-client/ui/view/common/LabeledList"
import LabeledItem   from "familiar-client/ui/view/common/LabeledItem"
import DashboardCard from "familiar-client/ui/view/dashboard/DashboardCard"


import classNames from "familiar-client/ui/view/dashboard/VisitorCountCard/classNames"

export default ({
    visitors = [],
    className,
    ...props
}) =>
    <DashboardCard
        title="訪問数"
        className={classNames.Host}
    >
        <LabeledList>
            <LabeledItem
                label={"訪問者数"}
                value={visitors.length}
            />
            <LabeledItem
                label={"訪問数"}
                value={visitors.map(v => v.general.visit_count).reduce((p, c) => p + c, 0)}
            />
        </LabeledList>
    </DashboardCard>
