import React        from "react"
import SectionTitle from "familiar-client/ui/view/common/SectionTitle"
import FABSpace     from "familiar-client/ui/view/common/FABSpace"
import Card         from "react-material/ui/view/Card"
import Aside        from "react-material/ui/view/Aside"

import classNames from "familiar-client/ui/view/setting/site/SetupManager/classNames"

export default ({
    className,
    getCurrentOrganizationId,
    ...props
}) =>  
    <div
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    >
        <div
            className={classNames.Content}
        >
            <SectionTitle>
                表示用タグ
            </SectionTitle>
            <p>
                訪問者Widgetを呼び出すにはスクリプトタグをページごとに記述する必要があります。<br/>
                表示するページのHTMLファイルを開き、
                <span>{"</Body>"}</span>タグの直前に以下のコードを挿入してください。
            </p>
            <Aside>
                // TODO url
                {'<script src="https://example.com/visitor/widget/main.js?account_id=' + getCurrentOrganizationId() + '"></script>'}
            </Aside>
        </div>
        <FABSpace/>
    </div>
