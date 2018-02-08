import React           from "react"
import ReactDOM        from "react-dom"
import ToolBar         from "familiar-client/ui/view/common/toolBar/ToolBar"
import FABSpace        from "familiar-client/ui/view/common/FABSpace"
import SendImageDialog from "familiar-client/ui/view/common/SendImageDialog"
import ViewImageDialog from "familiar-client/ui/view/common/ViewImageDialog"
import Card            from "react-material/ui/view/Card"
import Image           from "react-material/ui/view/Image"
import List            from "react-material/ui/view/List"
import ListItem        from "react-material/ui/view/ListItem"
import ListItemIcon    from "react-material/ui/view/ListItemIcon"
import MaterialIcon    from "react-material/ui/view/MaterialIcon"

import classNames from "familiar-client/ui/view/document/DocumentManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            images                  : [],            
            sendImageDialogIsVisible: false,
            selectImageUrl          : undefined,
            viewImageDialogIsVisible: false,
        })
    }

    componentDidMount() {
        ;(async _ => {
            let {
                documentImageApi: {
                    subscribe: subscribe
                }
            } = this.props

            this.setState({
                subscribeCertificate: await subscribe({
                    subscriber: images => this.setState({images})
                })
            })
        })()
    }

    componentWillUnmount() {
        let {
            documentImageApi: {
                unsubscribe
            }
        } = this.props

        if (this.state.subscribeCertificate)
            unsubscribe(this.state.subscribeCertificate)
    }
    
    render() {
        let {
            documentImageApi: {
                create: createImage
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
                                this.setState({sendImageDialogIsVisible: true})
                            }
                        >
                            <ListItemIcon
                                children="playlist_add"
                                component={MaterialIcon}
                            />
                            新規追加
                        </ListItem>
                    </List>
                </ToolBar>
                <div>
                {this.state.images.map((x, i) => 
                    <Card
                        key={i}
                        onClick={e => 
                            this.setState({
                                selectImageUrl          : x.url,
                                viewImageDialogIsVisible: true
                            })
                        }
                    >
                        <Image
                            height="160"
                            src={x.url}
                            width="160"
                        />
                    </Card>
                )}
                </div>
                <FABSpace/>
                <SendImageDialog
                    visible={this.state.sendImageDialogIsVisible}
                    title="画像追加"
                    onCancel={_ =>
                        this.setState({sendImageDialogIsVisible: false})
                    }
                    onSubmit={async e => {
                        e.preventDefault()
                        let form  = e.target
                        let image = form.elements["image"].files
                        
                        await createImage({image})
                        
                        this.setState({
                            sendImageDialogIsVisible: false
                        })
                    }}
                    name="image"
                />
                <ViewImageDialog
                    onCancel={_ => this.setState({viewImageDialogIsVisible: false})}
                    src={this.state.selectImageUrl}
                    visible={this.state.viewImageDialogIsVisible}
                />
            </div>
        )
    }
}