import React                    from "react"
import DurationTime             from "familiar-client/ui/view/common/DurationTime"
import FormatStringDate         from "familiar-client/ui/view/common/FormatStringDate"
import List                     from "familiar-client/ui/view/common/list/List"
import ListItem                 from "familiar-client/ui/view/common/list/ListItem"
import MaterialIcon             from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/history/ChatHistoryInformation/classNames"


export default ({
    className,
    visitor,
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
            className={classNames.Name}
        >
            <div>
                名前
            </div>
            <div>
                {visitor.name || visitor.general.name}
            </div>
        </div>
        <div>
            <List
                className={classNames.List}
            >
                <li
                    disabled={true}
                >
                    <div>
                        訪問時間
                    </div>
                    <FormatStringDate
                        timestamp={(visitor.general.connections[0] || {}).connected_date}
                        format="%DD%日 %HH%時%mm%分%ss%秒"
                    />
                </li>
                <li
                    disabled={true}
                >
                    <div>
                        初回訪問日時
                    </div>
                    <FormatStringDate
                        timestamp={visitor.general.created_date}
                        format="%DD%日 %HH%時%mm%分%ss%秒"
                    />
                </li>
                <li
                    disabled={true}
                >
                    <div>
                        滞在時間
                    </div>   
                    <DurationTime
                        connections={visitor.general.connections}
                    />
                </li>
                <li
                    disabled={true}
                >
                    <div>
                        訪問回数
                    </div>
                    <div>
                        {visitor.general.visit_count}回
                    </div>
                </li>
                <li
                    disabled={true}
                >
                    <div>
                        ID
                    </div>
                    <div>
                        {visitor.id}
                    </div>
                </li>
                <li
                    disabled={true}
                >
                    <div>
                        情報
                    </div>
                    <div>
                        {visitor.information ? visitor.information : "未設定"}
                    </div>
                </li>
                <li
                    disabled={true}
                >
                    <div>
                        メールアドレス
                    </div>
                    <div>
                        {visitor.email ? visitor.email : "未設定"}
                    </div>
                </li>
                <li
                    disabled={true}
                >
                    <div>
                        電話番号
                    </div>
                    <div>
                        {visitor.phone ? visitor.phone : "未設定"}
                    </div>
                </li>
            </List>
            <List
                className={classNames.List}
            >
                <li
                    disabled={true}
                >
                    <div>
                        HostName
                    </div>
                    <div>
                        {visitor.general.location && visitor.general.location.hostname}
                    </div>
                </li>
                <li
                    disabled={true}
                >
                    <div>
                        Path
                    </div>
                    <div>
                        {visitor.general.location && visitor.general.location.pathname}
                    </div>
                </li>
                <li
                    disabled={true}
                >
                    <div>
                        訪問者言語
                    </div>
                    <div>
                        {visitor.general.navigator && visitor.general.navigator.language}
                    </div>
                </li>
                <li
                    disabled={true}
                >
                    <div>
                        Platform
                    </div>
                    <div>
                        {visitor.general.navigator && visitor.general.navigator.platform}
                    </div>
                </li>
                <li
                    disabled={true}
                >
                    <div
                        className={classNames.UserAgent}
                    >
                        {visitor.general.navigator && visitor.general.navigator.User_agent}
                    </div>
                </li>
            </List>
        </div>
    </div>
