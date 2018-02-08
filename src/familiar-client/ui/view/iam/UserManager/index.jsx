import React        from "react"
import ToolBar      from "familiar-client/ui/view/common/toolBar/ToolBar"
import CreateDialog from "familiar-client/ui/view/iam/CreateDialog"
import EditDialog   from "familiar-client/ui/view/iam/EditDialog"
import UserList     from "familiar-client/ui/view/iam/UserList"
import UserListItem from "familiar-client/ui/view/iam/UserListItem"
import List         from "react-material/ui/view/List"
import ListItem     from "react-material/ui/view/ListItem"
import ListItemIcon from "react-material/ui/view/ListItemIcon"
import MaterialIcon from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/iam/UserManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            createDialogIsVisible: false,
            editedUser           : undefined,
            selectedUsers        : [],
            subscribeCertificate : undefined,
            users                : []
        })
    }

    componentDidMount() {
        ;(async _ => {
            let {
                organizationUserApi: {
                    subscribe
                }
            } = this.props

            let onChanged = x =>
                this.setState({
                    users: x
                })

            this.setState({
                subscribeCertificate: await subscribe({
                    subscriber: onChanged
                })
            })
        })()
    }

    componentWillUnmount() {
        let {
            organizationUserApi: {
                unsubscribe
            }
        } = this.props

        if (this.state.subscribeCertificate)
            unsubscribe(this.state.subscribeCertificate)
    }

    render() {
        let {
            getCurrentOrganizationId = _ => undefined,
            organizationUserApi,
            userOrganizationApi: {
                add   : addUser,
                remove: removeUser
            },
            createUserWithEmailAndPassword = ({email, password}) => undefined,
            ...props
        } = this.props

        return (
            <div
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
                                this.state.users.map;(async x => {
                                    if (this.state.selectedUsers.includes(x.id))
                                        await deleteUser({
                                            user: {
                                                id: x.id
                                            }
                                        })
                                })
                                
                                this.setState({
                                    selectedUsers: []
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
                <UserList
                    onAllSelecte={e =>
                        this.setState({
                            selectedUsers: (
                                this.state.selectedUsers.length < this.state.users.length ? this.state.users
                              :                                                             []
                            )
                        })
                    }
                >
                    {this.state.users.map(x =>
                        <UserListItem
                            key={x.id}
                            onEdited={e =>
                                this.setState({
                                    editedUser: x,
                                })
                            }
                            onSelected={e =>
                                this.setState({
                                    selectedUsers: (
                                        this.state.selectedUsers.some(y => y.id == x.id) ? this.state.selectedUsers.filter(y => y.id != x.id)
                                        :                                                  this.state.selectedUsers.concat(x)
                                    )
                                })
                            }
                            selected={this.state.selectedUsers.some(y => y.id == x.id)}
                            user={x}
                        />
                    )}
                </UserList>
                <CreateDialog
                    create={async x => {
                        let id = await createUserWithEmailAndPassword({
                            email   : x.email,
                            password: x.password
                        })

                        await addUser({
                            organization: {
                                id: getCurrentOrganizationId() 
                            },
                            user: {
                                id,
                                email: x.email,
                                name: x.name,
                                display_name: x.displayName,
                                created_date: new Date().getTime()
                            }
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
                    update={async x => {
                        await updateUser(x)

                        this.setState({
                            editedUser: undefined
                        })
                    }}
                    onCancel={_ =>
                        this.setState({
                            editedUser: undefined
                        })
                    }
                    visible={this.state.editedUser}
                    user={this.state.editedUser}
                />
            </div>
        )
    }
}

