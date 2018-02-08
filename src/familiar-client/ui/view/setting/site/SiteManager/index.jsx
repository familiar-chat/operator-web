import React               from "react"
import FABSpace            from "familiar-client/ui/view/common/FABSpace"
import CreateDialog        from "familiar-client/ui/view/setting/site/CreateDialog"
import NotificationManager from "familiar-client/ui/view/setting/site/notification/NotificationManager"
import WidgetManager       from "familiar-client/ui/view/setting/site/widget/WidgetManager"
import Card                from "react-material/ui/view/Card"
import List                from "react-material/ui/view/List"
import ListItem            from "react-material/ui/view/ListItem"
import ListItemIcon        from "react-material/ui/view/ListItemIcon"
import MaterialIcon        from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/setting/site/SiteManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedSite: undefined,
            subscribeCertificate: undefined,
            createSiteDialogIsVisible: false
        })
    }

    componentDidMount() {
        this.setState({
            selectedSite: this.props.sites.find(x => x.defaulted)
        })
    }

    render() {
        let {
            siteApi: {
                create,
                update
            },
            sites,
            siteImageApi: {
                create: createSiteImage
            },
            sounds,
            currentNotificationApi,
            currentWidgetApi,
            ...props
        } = this.props

        return (
            <div
                {...props}
            >
                <Card
                    className={classNames.Card}
                >
                    <div
                        className={classNames.SideBar}
                    >
                        <div>
                            URLPath
                        </div>
                        <List
                            className={classNames.List}
                        >
                            {sites.map(s => 
                                <ListItem
                                    key={s.id + "list-item"}
                                    className={s.id == (this.state.selectedSite && this.state.selectedSite.id) && classNames.Selected}
                                    onClick={e => 
                                        this.setState({
                                            selectedSite: s
                                        })
                                    }
                                    style={
                                        s.defaulted && s.id == (this.state.selectedSite && this.state.selectedSite.id) ? {backgroundColor: "#80CBC4"}
                                      :                                                                                  {}
                                    }
                                >
                                    <ListItemIcon
                                        component={MaterialIcon}
                                    >
                                        pageview
                                    </ListItemIcon>
                                    {s.defaulted ? "デフォルト" : s.hostname}
                                </ListItem>
                            )}
                            <ListItem
                                onClick={e =>
                                    this.setState({
                                        createSiteDialogIsVisible: true
                                    })
                                }
                            >
                                <ListItemIcon
                                    component={MaterialIcon}
                                >
                                    add_circle
                                </ListItemIcon>
                                新規追加
                            </ListItem>
                        </List>
                    </div>
                    <div
                        className={classNames.Content}
                    >   
                        {this.state.selectedSite &&
                            [<NotificationManager
                                key={this.state.selectedSite.id + "n"}
                                notification={this.state.selectedSite.notification}
                                sounds={sounds}
                                update={async n =>
                                    await update({
                                        site:{
                                            id: this.state.selectedSite.id,
                                            notification: {
                                                ...n
                                            }
                                        }
                                    })
                                }
                            />]
                        }
                        {this.state.selectedSite &&
                            [<WidgetManager
                                key={this.state.selectedSite.id + "w"}
                                widget={this.state.selectedSite.widget}
                                update={async w => {
                                    await update({
                                        site:{
                                            id: this.state.selectedSite.id,
                                            widget: {
                                                ...w
                                            }
                                        }
                                    })
                                }}
                                createImage={async image => 
                                    await createSiteImage({
                                        site:{
                                            id: this.state.selectedSite.id
                                        },
                                        image
                                    })
                                }
                            />]
                        }
                    </div>
                </Card>
                <FABSpace/>
                <CreateDialog
                    visible={this.state.createSiteDialogIsVisible}
                    create={async s => {
                        await create({
                            site: s
                        })
                        this.setState({
                            createSiteDialogIsVisible: false
                        })
                    }}
                    onCancel={_ =>
                        this.setState({
                            createSiteDialogIsVisible: false
                        })
                    }
                />
            </div>
        )
    }
}
