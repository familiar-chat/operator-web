import React            from "react"
import FABSpace         from "familiar-client/ui/view/common/FABSpace"
import Card             from "react-material/ui/view/Card"
import FlexibleSpace    from "react-material/ui/view/FlexibleSpace"
import DropDownButton   from "react-material/ui/view/form/DropDownButton"
import IconToggle       from "react-material/ui/view/IconToggle"
import LinearLayout     from "react-material/ui/view/LinearLayout"
import List             from "react-material/ui/view/List"
import ListItem         from "react-material/ui/view/ListItem"
import ListItemTextArea from "react-material/ui/view/ListItemTextArea"
import MaterialIcon     from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/chat/VisitorList/classNames"

export default ({
    children,
    isAsc = true,
    onColumnChange = sortColumn => undefined,
    onSortButtonClick = e => undefined,
    sortColumn = "visitorMessageCount",
    ...props
}) =>
    <div
        {...props}
    >
        <Card
            className={classNames.Card}
            orientation="vertical"
        >
            <LinearLayout
                className={classNames.Toolbar}
                orientation="horizontal"
            >
                <MaterialIcon>
                    person
                </MaterialIcon>
                <div>
                    訪問者一覧
                </div>
                <FlexibleSpace/>
                <DropDownButton
                    className={classNames.DropDownButton}
                    value={
                        sortColumn == "visitorMessageCount"? "訪問者発言数"
                      : sortColumn == "messageCreatedDate" ? "最終発言時間"
                      : sortColumn == "unreadCount"        ? "未読数"
                      : sortColumn == "visitCount"         ? "訪問回数"
                      : sortColumn == "visitorId"          ? "訪問者ID"
                      :                                      "訪問者ID"
                    }
                >
                    <ListItem
                        onClick={_ => onColumnChange("visitorMessageCount")}
                        style={sortColumn == "visitorMessageCount" ? {display: "none"} : {}}
                    >
                        <ListItemTextArea>
                            訪問者発言数
                        </ListItemTextArea>
                    </ListItem>
                    <ListItem
                        onClick={_ => onColumnChange("messageCreatedDate")}
                        style={sortColumn == "messageCreatedDate" ? {display: "none"} : {}}
                    >
                        <ListItemTextArea>
                            最終発言時間
                        </ListItemTextArea>
                    </ListItem>
                    <ListItem
                        onClick={_ => onColumnChange("unreadCount")}
                        style={sortColumn == "unreadCount" ? {display: "none"} : {}}
                    >
                        <ListItemTextArea>
                            未読数
                        </ListItemTextArea>
                    </ListItem>
                    <ListItem
                        onClick={_ => onColumnChange("visitCount")}
                        style={sortColumn == "visitCount" ? {display: "none"} : {}}
                    >
                        <ListItemTextArea>
                            訪問回数
                        </ListItemTextArea>
                    </ListItem>
                    <ListItem
                        onClick={_ => onColumnChange("visitorId")}
                        style={sortColumn == "visitorId" ? {display: "none"} : {}}
                    >
                        <ListItemTextArea>
                            訪問者ID
                        </ListItemTextArea>
                    </ListItem>
                </DropDownButton>
                <LinearLayout
                    orientation="horizontal"
                >
                    <div>
                        {isAsc ? "昇順 ↓" : "降順 ↑"}
                    </div>
                    <IconToggle
                        onClick={onSortButtonClick}
                    >
                        <MaterialIcon>
                            sort_by_alpha
                        </MaterialIcon>
                    </IconToggle>
                </LinearLayout>
            </LinearLayout>
            <List>
                {children}
            </List>
        </Card>
        <FABSpace/>
    </div>
