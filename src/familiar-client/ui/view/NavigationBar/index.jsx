import React            from "react"
import Link             from "familiar-client/ui/view/common/Link"
import List             from "familiar-client/ui/view/common/list/List"
import ListItem         from "familiar-client/ui/view/common/list/ListItem"
import Button           from "react-material/ui/view/Button"
import MaterialIcon     from "react-material/ui/view/MaterialIcon"
import NavigationDrawer from "react-material/ui/view/NavigationDrawer"

import classNames from "familiar-client/ui/view/NavigationBar/classNames"

let items = [
    {
        icon: "forum",
        path: "/chat",
        text: "チャット"
    },
    {
        icon: "assignment",
        path: "/fixed_phrases",
        text: "定型文"
    },
    {
        icon: "account_circle",
        path: "/user",
        text: "オペレーター"
    },
    {
        icon: "supervisor_account",
        path: "/iam",
        text: "管理"
    },
    {
        icon : "settings",
        items: [
            {
                path: "/settings/organization",
                text: "組織"
            },
            {
                path: "/settings/calendar",
                text: "営業時間"
            },
            {
                path:"/settings/site",
                text: "サイト"
            },
            {
                path:"/settings/trigger",
                text: "自動対応"
            },
        ],
        text : "設定"
    }
]

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndexes: []
        })
    }

    render() {
        let toListItem = ({
            dimension,
            icon,
            index,
            items,
            path,
            Component = (
                path ? Link
              :        "span"
            ),
            text
        }) =>
            <ListItem
                className={classNames.ListItem}
                key={index}
                list={items && (
                    <List
                        className={
                            [
                                classNames.OpenableList,
                                !this.state.selectedIndexes.includes(index) && classNames.Hidden
                            ].join(" ")
                        }
                        style={
                            this.state.selectedIndexes.includes(index) ? {height: 52 * items.length + "px"}
                          :                                              {height: "0"}
                        }
                    >
                        {
                            Array.from(items.entries()).map(([i, v]) => toListItem({
                                index: index + i,
                                ...v
                            }))
                        }
                    </List>
                )}
            >
                <Component
                    to={path}
                    className={
                        [
                            classNames.Link,
                            new RegExp("^" + path).test(location.pathname) ? classNames.Selected
                          :                                                  classNames.UnSelected
                        ].join(" ")
                    }
                    onClick={items && (e => {
                        this.setState({
                            selectedIndexes: this.state.selectedIndexes.includes(index)
                                ? this.state.selectedIndexes.filter(x => x != index)
                                : this.state.selectedIndexes.concat(index)
                        })
                    })}
                >
                    <MaterialIcon
                        className={classNames.Icon}
                    >
                        {icon}
                    </MaterialIcon>
                    <span
                        className={classNames.Text}
                    >
                        {text}
                    </span>
                    {items && (
                        <MaterialIcon
                            className={
                                [
                                    classNames.Icon,
                                    this.state.selectedIndexes.includes(index) && classNames.Close
                                ].join(" ")
                            }
                        >
                            keyboard_arrow_down
                        </MaterialIcon>
                    )}
                </Component>
            </ListItem>

        let {
            className,
            visible,
            location
        } = this.props

        return (
            <NavigationDrawer
                className={
                    [
                        className,
                        classNames.Host
                    ].join(" ")
                }
                visible={visible}
            >
                <div>
                    <List
                        value={location.pathname}
                    >
                        {Array.from(items.entries()).map(
                            ([i, v]) => toListItem({
                                index: "" + i,
                                ...v
                            })
                        )}
                    </List>
                </div>
                <span className={classNames.Border}/>
                <List>
                    <ListItem
                        className={classNames.ListItem}
                    >
                        <Link
                            className={classNames.Link}
                            to="/document"
                        >
                            <MaterialIcon
                                className={classNames.Icon}
                            >
                                folder
                            </MaterialIcon>
                            <span
                                className={classNames.Text}
                            >
                                ドキュメント
                            </span>
                        </Link>
                    </ListItem>
                    <ListItem
                        className={classNames.ListItem}
                    >
                        <Link
                            className={classNames.Link}
                            to="/history"
                        >
                            <MaterialIcon
                                className={classNames.Icon}
                            >
                                settings_backup_restore
                            </MaterialIcon>
                            <span
                                className={classNames.Text}
                            >
                                履歴
                            </span>
                        </Link>
                    </ListItem>
                    <ListItem
                        className={classNames.ListItem}
                    >
                        <Link
                            className={classNames.Link}
                            to="/dashboard"
                        >
                            <MaterialIcon
                                className={classNames.Icon}
                            >
                                timeline
                            </MaterialIcon>
                            <span
                                className={classNames.Text}
                            >
                                ダッシュボード
                            </span>
                        </Link>
                    </ListItem>
                </List>
            </NavigationDrawer>
        )
    }
}
