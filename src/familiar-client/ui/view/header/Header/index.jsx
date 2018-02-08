import React          from "react"
import EditableAvatar from "familiar-client/ui/view/common/EditableAvatar"
import Link           from "familiar-client/ui/view/common/Link"
import HeaderStatus   from "familiar-client/ui/view/header/HeaderStatus"
import Button         from "react-material/ui/view/Button"
import IconToggle     from "react-material/ui/view/IconToggle"
import ListItem       from "react-material/ui/view/ListItem"
import MaterialIcon   from "react-material/ui/view/MaterialIcon"
import Menu           from "react-material/ui/view/Menu"
import Popup          from "react-material/ui/view/Popup"
import Shadow         from "react-material/ui/effect/Shadow"
import ToolBar        from "react-material/ui/view/Toolbar"

import classNames from "familiar-client/ui/view/header/Header/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            headerPopupIsVisible: false,
            statusMenuIsVisible : false,
            color: undefined
        })
    }

    render() {
        let {
            className,
            onNavigationButtonClick = _ => undefined,
            signOut = _ => undefined,
            style,
            userApi,
            user,
        } = this.props

        return (
            <ToolBar
                className={classNames.Host}
                style={{
                    backgroundColor: this.state.color
                }}
            >
                <div
                    className={classNames.LeftSide}
                >
                    <IconToggle
                        className={classNames.IconContainer}
                        onClick={onNavigationButtonClick}
                    >
                        <MaterialIcon
                            className={classNames.DehazeIcon}
                        >
                            dehaze
                        </MaterialIcon>
                    </IconToggle>
                    <div
                        className={classNames.AppBarLogo}
                        onClick={e => this.setState({color: "orange"})}
                    />
                </div>
                <div
                    className={classNames.RightSide}
                >
                    <HeaderStatus
                        onClick={e => {
                            this.setState({
                                headerPopupIsVisible: true
                            })
                        }}
                        user={user}
                    />
                    <Popup
                        className={classNames.Popup}
                        onCancel={e => this.setState({headerPopupIsVisible: false})}
                        visible={this.state.headerPopupIsVisible}
                    >
                        <div
                            className={classNames.Profile}
                        >
                            <EditableAvatar
                                className={classNames.OperatorImg}
                                component={Link}
                                to="/user?tab_index=0"
                                src={user && user.image}
                            />
                            <div>
                                <div
                                    className={classNames.ProfileName}
                                >
                                    {user && user.name}
                                </div>
                                <div>
                                    {user && user.display_name}
                                    </div>
                                <div>
                                    {user && user.email}
                                    </div>
                                <div
                                    className={classNames.Operate}
                                >
                                    <div>
                                        <Button
                                            component="span"
                                            className={classNames.SelectButton}
                                            onClick={e => {
                                                this.setState({statusMenuIsVisible: true})
                                            }}
                                        >
                                            {user && user.state == 1 ? "受付中" : "退席中"}
                                            <MaterialIcon
                                                className={classNames.Icon}
                                            >
                                                arrow_drop_down
                                            </MaterialIcon>
                                        </Button>
                                        <Button
                                            onClick={e => {
                                                signOut()
                                            }}
                                        >
                                            ログアウト
                                        </Button>
                                    </div>
                                    <Menu
                                        visible={this.state.statusMenuIsVisible}
                                        onCancel={e =>
                                            this.setState({
                                                statusMenuIsVisible: false
                                            })
                                        }
                                        className={classNames.Menu}
                                    >
                                        <ListItem
                                            onClick={async _ => {
                                            }}
                                        >
                                            受付中
                                        </ListItem>
                                        <ListItem
                                            onClick={async_ => {
                                            }}
                                        >
                                            退席中
                                        </ListItem>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </div>
            </ToolBar>
        )
    }
}