import React              from "react"
import ReactDOM           from "react-dom"
import IconToggle         from "react-material/ui/view/IconToggle"
import List               from "react-material/ui/view/List"
import ListItemTextArea   from "react-material/ui/view/ListItemTextArea"
import MaterialIcon       from "react-material/ui/view/MaterialIcon"
import TextField          from "react-material/ui/view/form/TextField"

import classNames from "familiar-client/ui/view/widget/ChatPanel/classNames"

export default class extends React.Component {
    render() {
        let {
            className,
            organizationFixedPhrases = [],
            onSendImageButtonClick = e => undefined,
            sendMessage = text => undefined,
            user,
            userFixedPhrases = [],
            visitor,
            visitorReceivedMessageApi: {
                create
            },
            ...props
        }  = this.props

        return (
            <form
                className={
                    [
                        className,
                        classNames.Host
                    ].join(" ")
                }
                {...props}
            >
                <div>
                    <div>
                        <IconToggle
                            Component={MaterialIcon}
                            onClick={onSendImageButtonClick}
                        >
                            photo
                        </IconToggle>
                    </div>
                    <TextField
                        name="chatPanel"
                        labelText="メッセージ"
                        autoComplete="off"
                        placeholder="shift + Enterで送信"
                        multiLine
                        onKeyDown={e => {
                            if (e.shiftKey && e.keyCode == 13 && e.target.value == "") {
                                e.preventDefault()
                            } else if (e.shiftKey && e.keyCode == 13 && e.target.value != "") {
                                e.preventDefault()
                                //Pass-by-value
                                let value      = Object.assign("", {text: e.target.value})
                                e.target.value = ""

                                ;(async _ => {
                                    await create({
                                        visitor: {
                                            id: visitor.id
                                        },
                                        message : {
                                            text        : value.text,
                                            sender      : "operator",
                                            sender_image: user.image,
                                            display_name: user.display_name,
                                            created_date: new Date().getTime()
                                        }
                                    })
                                    sendMessage(value.text)
                                })()
                            }
                        }}
                    />
                </div>
                <List
                    className={classNames.List}
                    orientation="horizontal"
                >
                    {userFixedPhrases.map((x, i) => 
                        (
                            x.enabled ? 
                                <ListItemTextArea
                                    key={"uf" + x.id}
                                    onClick={e => {
                                        let element = ReactDOM.findDOMNode(this).firstChild.children[1].children[1]
                                        element.value = element.value + x.value
                                        element.focus()
                                    }}
                                >
                                    {x.name}
                                </ListItemTextArea>
                              : null
                        )
                    )}
                    {organizationFixedPhrases.map((x, i) => 
                        (
                            x.enabled ? 
                            <ListItemTextArea
                                key={"of" + x.id}
                                onClick={e => {
                                    let element = ReactDOM.findDOMNode(this).firstChild.children[1].children[1]
                                    element.value = element.value + x.value
                                    element.focus()
                                }}
                            >
                                {x.name}
                            </ListItemTextArea>
                          : null
                        )
                    )}
                </List>
            </form>
        )
    }
}