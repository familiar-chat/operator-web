import React            from "react"
import Button           from "react-material/ui/view/Button"
import Card             from "react-material/ui/view/Card"
import Dialog           from "react-material/ui/view/Dialog"
import DialogBody       from "react-material/ui/view/DialogBody"
import DialogFooter     from "react-material/ui/view/DialogFooter"
import DialogHeader     from "react-material/ui/view/DialogHeader"
import Image            from "react-material/ui/view/Image"
import ImageInput       from "react-material/ui/view/form/ImageInput"
import Shadow           from "react-material/ui/effect/Shadow"
import Tab              from "react-material/ui/view/Tab"
import TabBar           from "react-material/ui/view/TabBar"
import ViewPager        from "react-material/ui/view/ViewPager"

import classNames from "familiar-client/ui/view/common/ImageSelectDialog/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            images              : [],
            selectedIndex       : 0,
            selectedImageUrl    : undefined
        })
    }

    componentDidMount() {
        ;(async _ => {
            let {
                documentImageApi: {
                    read
                }
            } = this.props

            this.setState({
                images: await read()
            })
        })()
    }

    render() {
        let {
            documentImageApi: {
                create: createImage
            },
            onSubmit = e => undefined,
            onDocumentImageSend = url => undefined,
            onNewImageSend = img => undefined,
            onCancel,
            ...props
        } = this.props
    
        return (
            <Dialog
                className={classNames.Host}
                onCancel={onCancel}
                onSubmit={e => {
                    e.preventDefault()
                    onSubmit(e)

                    if(this.state.selectedIndex == 0) {
                        let form  = e.target
                        let image = form.elements["image"].files
                        image && onNewImageSend(image)
                    } else if(this.state.selectedIndex == 1) {
                        this.state.selectedImageUrl && onDocumentImageSend(this.state.selectedImageUrl)
                    }
                }}
                component="form"
                {...props}
            >
                <DialogHeader>
                    <TabBar
                        selectedIndex={this.state.selectedIndex}
                    >
                        <Tab
                            onClick={e=> this.setState({selectedIndex: 0})}
                        >
                            アップロード
                        </Tab>
                        <Tab
                            onClick={e=> this.setState({selectedIndex: 1})}
                        >
                            選択
                        </Tab>
                    </TabBar>
                </DialogHeader>
                <DialogBody>
                    <ViewPager
                        selectedIndex={this.state.selectedIndex}
                    >
                        <div>
                            <ImageInput
                                className={classNames.ImageInput}
                                labelText="クリックして選択"
                                name="image"
                                height="300"
                                width="300"
                            />
                        </div>
                        <div
                            className={classNames.DocumentImage}
                            style={{
                                display:'flex',
                                flexWrap: 'wrap'
                            }}
                        >
                        {this.state.images.map((x, i) => 
                            <Image
                                src={x.url}
                                key={i}
                                onClick={e => {
                                    this.setState({
                                        selectedImageUrl: x.url
                                    })
                                }}
                                style={{
                                    borderColor: this.state.selectedImageUrl == x.url ? "#2196F3" : "#fafbfd",
                                    width:'8rem',
                                    height:'8rem'
                                }}
                            />
                        )}
                        </div>
                    </ViewPager>
                </DialogBody>
                <DialogFooter>
                    <Button
                        type="flat"
                        onClick={onCancel}
                    >
                        キャンセル
                    </Button>
                    <Button
                        component="button"
                        type="flat"
                    >
                        送信
                    </Button>
                </DialogFooter>
            </Dialog>
        )
    }
}
