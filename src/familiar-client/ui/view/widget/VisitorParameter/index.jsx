import React                    from "react"
import BoxInformation           from "familiar-client/ui/view/widget/BoxInformation"
import getAllMessageByVisitor   from "familiar-client/util/getAllMessageByVisitor"

import classNames from "familiar-client/ui/view/widget/VisitorParameter/classNames"

export default ({
    visitor,
    className,
    ...props
}) => 
    <div
        {...props}
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
    >
        <BoxInformation
            label="訪問回数"
            value={
                !visitor ? undefined
              :            visitor.general.visit_count == 1 ? "初回"
                         :                                     visitor.general.visit_count
            }
            unit={
                !visitor ? undefined
              :            visitor.general.visit_count == 1 ? ""
                         :                                    "回"
            }
            iconColor="#6D4C41"
            icon="transfer_within_a_station"
        />
        <BoxInformation
            label="発言回数"
            value={visitor && getAllMessageByVisitor(visitor).length}
            unit="回"
            iconColor="#0288D1"
            icon="forum"
        />
        <BoxInformation
            label="滞在時間"
            connections={visitor && visitor.general.connections}
            iconColor="#F57C00"
            icon="timer"
        />
    </div>