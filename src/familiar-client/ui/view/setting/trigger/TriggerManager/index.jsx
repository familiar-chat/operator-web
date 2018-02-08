import React               from "react"
import ToolBar             from "familiar-client/ui/view/common/toolBar/ToolBar"
import CreateDialog        from "familiar-client/ui/view/setting/trigger/CreateDialog"
import EditDialog          from "familiar-client/ui/view/setting/trigger/EditDialog"
import TriggerList         from "familiar-client/ui/view/setting/trigger/TriggerList"
import TriggerListItem     from "familiar-client/ui/view/setting/trigger/TriggerListItem"
import Button              from "react-material/ui/view/Button"
import List                from "react-material/ui/view/List"
import ListItem            from "react-material/ui/view/ListItem"
import ListItemIcon        from "react-material/ui/view/ListItemIcon"
import MaterialIcon        from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/setting/trigger/TriggerManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            triggers             : [],
            createDialogIsVisible: undefined,
            documentImages       : [],
            selectedTriggers     : [],
            editedTrigger        : undefined
        })
    }

    componentDidMount() {
        ;(async _ => {
            let {
                triggerApi: {
                    subscribe: subscribe
                },
                documentImageApi: {
                    read: readDocumentImage
                }
            } = this.props
            


            this.setState({
                subscribeCertificate: await subscribe({
                    subscriber: triggers => this.setState({triggers})
                }),
                documentImages: await readDocumentImage()
            })
        })()
    }

    componentWillUnmount() {
        let {
            triggerApi: {
                unsubscribe
            }
        } = this.props

        if (this.state.subscribeCertificate)
            unsubscribe(this.state.subscribeCertificate)
    }

    render() {
        let {
            documentImageApi,            
            triggerApi: {
                create: createTrigger,
                delete: deleteTrigger,
                update: updateTrigger
            },
            ...props
        } = this.props

        return (
            <div
                className={classNames.Host}
                {...props}
            >
                <ToolBar>
                    <List
                        orientation="horizontal"
                    >
                        <ListItem
                            onClick={e =>
                                this.setState({createDialogIsVisible: true})
                            }
                        >
                            <ListItemIcon
                                children="playlist_add"
                                component={MaterialIcon}
                            />
                            新規追加
                        </ListItem>
                    </List>
                    <List
                        orientation="horizontal"
                    >
                        <ListItem
                            onClick={e => {
                                for (let x of this.state.selectedTriggers)
                                    updateTrigger({
                                        trigger: {
                                            id     : x.id,
                                            enabled: true
                                        }
                                    })
                            }}
                        >
                            <ListItemIcon
                                children="check"
                                component={MaterialIcon}
                            />
                            有効化
                        </ListItem>
                        <ListItem
                            onClick={e => {
                                for (let x of this.state.selectedTriggers)
                                    updateTrigger({
                                        trigger: {
                                            id     : x.id,
                                            enabled: false
                                        }
                                    })
                            }}
                        >
                            <ListItemIcon
                                children="close"
                                component={MaterialIcon}
                            />
                            無効化
                        </ListItem>
                        <ListItem
                            onClick={e => {
                                for (let x of this.state.selectedTriggers)
                                    deleteTrigger({
                                        trigger: x
                                    })

                                this.setState({
                                    selectedTriggers: []
                                })
                            }}
                        >
                            <ListItemIcon
                                children="delete"
                                component={MaterialIcon}
                            />
                            削除
                        </ListItem>
                    </List>
                </ToolBar>
                <TriggerList
                    onAllSelecte={e =>
                        this.setState({
                            selectedTriggers: (
                                this.state.selectedTriggers.length < this.state.triggers.length ? this.state.triggers
                              :                                                                   []
                            )
                        })
                    }
                >
                    {this.state.triggers.map(
                        x =>
                            <TriggerListItem
                                trigger={x}
                                key={x.id}
                                onDisabled={e =>
                                    updateTrigger({
                                        trigger: {
                                            id     : x.id,
                                            enabled: false
                                        }
                                    })
                                }
                                onEdit={e =>
                                    this.setState({
                                        editedTrigger: x,
                                    })
                                }
                                onEnabled={e =>
                                    updateTrigger({
                                        trigger: {
                                            id     : x.id,
                                            enabled: true
                                        }
                                    })
                                }
                                onSelected={e =>
                                    this.setState({
                                        selectedTriggers: (
                                            this.state.selectedTriggers.some(y => y.id == x.id) ? this.state.selectedTriggers.filter(y => x.id != y.id)
                                          :                                                       this.state.selectedTriggers.concat(x)
                                        )
                                    })
                                }
                                selected={this.state.selectedTriggers.some(y => y.id == x.id)}
                            />
                    )}
                </TriggerList>
                <CreateDialog
                    create={async x => {
                        await createTrigger({
                            trigger: x
                        })

                        this.setState({
                            createDialogIsVisible: false
                        })
                    }}
                    documentImages={this.state.documentImages}
                    onCancel={_ =>
                        this.setState({
                            createDialogIsVisible: false
                        })
                    }
                    visible={this.state.createDialogIsVisible}
                />
                {[
                    this.state.editedTrigger
                 && <EditDialog
                        documentImages={this.state.documentImages}
                        trigger={this.state.editedTrigger}
                        onCancel={_ =>
                            this.setState({
                                editedTrigger: undefined
                            })
                        }
                        key={this.state.editedTrigger.id}
                        visible={this.state.editedTrigger}
                        update={async x => {
                            await updateTrigger({
                                trigger: {
                                    id: this.state.editedTrigger.id,
                                    ...x
                                }
                            })
                            
                            this.setState({
                                editedTrigger: undefined
                            })
                        }}
                    />
                ]}
            </div>
        )
    }
}