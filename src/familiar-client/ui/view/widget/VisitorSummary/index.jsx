import React                    from "react"
import Datum                    from "familiar-client/ui/view/widget/Datum"
import getAllMessageByVisitor   from "familiar-client/util/getAllMessageByVisitor"

import classNames  from "familiar-client/ui/view/widget/VisitorSummary/classNames"

export default ({
    visitor = [],
    component = "div",
    Component = component,
    className,
    ...props
}) => 
    <Component
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    >
        <div>
            <Datum
                label="メールアドレス"
                value={visitor && visitor.email}
            />
            <Datum
                label="情報"
                value={visitor && visitor.information}
            />
        </div>
        <div>
            <Datum
                label="滞在ページ"
                value={visitor && visitor.general && (visitor.general.location || {}).pathname}
            />
            <div
                className={classNames.CountDatum}
            >
                <Datum
                    label="訪問回数"
                    value={visitor && visitor.general.visit_count  == 1 ? "初回訪問" : visitor.general.visit_count}
                />
                <Datum
                    label="発言回数"
                    value={visitor && getAllMessageByVisitor(visitor).length ||  "発言なし"}
                />
            </div>
        </div>
    </Component>