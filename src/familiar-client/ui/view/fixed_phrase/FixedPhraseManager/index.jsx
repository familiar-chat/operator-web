import React               from "react"
import ToolBar             from "familiar-client/ui/view/common/toolBar/ToolBar"
import CreateDialog        from "familiar-client/ui/view/fixed_phrase/CreateDialog"
import EditDialog          from "familiar-client/ui/view/fixed_phrase/EditDialog"
import FixedPhraseList     from "familiar-client/ui/view/fixed_phrase/FixedPhraseList"
import FixedPhraseListItem from "familiar-client/ui/view/fixed_phrase/FixedPhraseListItem"
import Button              from "react-material/ui/view/Button"
import List                from "react-material/ui/view/List"
import ListItem            from "react-material/ui/view/ListItem"
import ListItemIcon        from "react-material/ui/view/ListItemIcon"
import MaterialIcon        from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/fixed_phrase/FixedPhraseManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            createDialogIsVisible: false,
            editedFixedPhrase: undefined,
            fixedPhrases: [],
            selectedFixedPhrases: [],
        })
    }

    render() {
        let {
            fixedPhraseApi: {
                create: createFixedPhrase,
                delete: deleteFixedPhrase,
                update: updateFixedPhrase
            },
            fixedPhrases = [],
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
                                for (let x of this.state.selectedFixedPhrases)
                                    updateFixedPhrase({
                                        fixedPhrase: {
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
                                for (let x of this.state.selectedFixedPhrases)
                                    updateFixedPhrase({
                                        fixedPhrase: {
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
                                for (let x of this.state.selectedFixedPhrases)
                                    deleteFixedPhrase({
                                        fixedPhrase: x
                                    })

                                this.setState({
                                    selectedFixedPhrases: []
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
                <FixedPhraseList
                    onAllSelecte={e =>
                        this.setState({
                            selectedFixedPhrases: (
                                this.state.selectedFixedPhrases.length < fixedPhrases.length ? fixedPhrases
                              :                                                                []
                            )
                        })
                    }
                >
                    {fixedPhrases.map(
                        x =>
                            <FixedPhraseListItem
                                fixedPhrase={x}
                                key={x.id}
                                onDisabled={_ =>
                                    updateFixedPhrase({
                                        fixedPhrase: {
                                            id     : x.id,
                                            enabled: false
                                        }
                                    })
                                }
                                onEdit={_ =>
                                    this.setState({
                                        editedFixedPhrase: x,
                                    })
                                }
                                onEnabled={_ =>
                                    updateFixedPhrase({
                                        fixedPhrase: {
                                            id     : x.id,
                                            enabled: true
                                        }
                                    })
                                }
                                onSelected={_ =>
                                    this.setState({
                                        selectedFixedPhrases: (
                                            this.state.selectedFixedPhrases.some(y => y.id == x.id) ? this.state.selectedFixedPhrases.filter(y => x.id != y.id)
                                          :                                                           this.state.selectedFixedPhrases.concat(x)
                                        )
                                    })
                                }
                                selected={this.state.selectedFixedPhrases.some(y => y.id == x.id)}
                            />
                    )}
                </FixedPhraseList>
                <CreateDialog
                    create={async x => {
                        await createFixedPhrase({
                            fixedPhrase: x
                        })
                        this.setState({
                            createDialogIsVisible: false
                        })
                    }}
                    onCancel={_ =>
                        this.setState({
                            createDialogIsVisible: false
                        })
                    }
                    visible={this.state.createDialogIsVisible}
                />
                <EditDialog
                    fixedPhrase={this.state.editedFixedPhrase}
                    onCancel={_ =>
                        this.setState({
                            editedFixedPhrase: undefined
                        })
                    }
                    visible={this.state.editedFixedPhrase}
                    update={async x => {
                        await updateFixedPhrase({
                            fixedPhrase: {
                                id: this.state.editedFixedPhrase.id,
                                ...x
                            }
                        })

                        this.setState({
                            editedFixedPhrase: undefined
                        })
                    }}
                />
            </div>
        )
    }
}
