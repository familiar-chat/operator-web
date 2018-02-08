import React              from "react"
import EditableAvatar     from "familiar-client/ui/view/common/EditableAvatar"
import SendImageDialog        from "familiar-client/ui/view/common/SendImageDialog"
import ColorSelector      from "familiar-client/ui/view/setting/site/widget/ColorSelector"
import Button             from "react-material/ui/view/Button"
import FlexibleSpace      from "react-material/ui/view/FlexibleSpace"
import LinearLayout       from "react-material/ui/view/LinearLayout"
import TextField          from "react-material/ui/view/form/TextField"

import classNames from "familiar-client/ui/view/setting/site/widget/WidgetManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndexes: [],
            widget         : undefined,
            dialogIsVisible: false
        })
    }

    componentDidMount() {
        this.setState({widget: this.props.widget})
    }

    render() {
        let {
            createImage = _ => undefined,
            widget,
            update = _ => undefined,
            ...props
        } = this.props

        return (
            <div
                className={classNames.Host}
                {...props}
            >
                <div>
                    widget設定
                </div>
                <form
                    className={classNames.From}
                    onSubmit={async e => {
                        e.preventDefault()

                        let form = e.target

                        await update({
                            ...this.state.widget,
                            title: form.elements["title"].value,
                            subtitle: form.elements["subtitle"].value,
                            description: form.elements["description"].value
                        })
                    }}
                >
                    <div>
                        <div>
                            <TextField
                                autoComplete="off"
                                name="title"
                                labelText="Title"
                                defaultValue={widget && widget.title}
                                onInput={e => {
                                    this.state.widget.title = e.target.value
                                    this.forceUpdate()
                                }}
                                required
                            />
                            <TextField
                                autoComplete="off"
                                name="subtitle"
                                labelText="Subtitle"
                                defaultValue={widget && widget.subtitle}
                                onInput={e => {
                                    this.state.widget.subtitle = e.target.value
                                    this.forceUpdate()
                                }}
                                required
                            />
                            <TextField
                                autoComplete="off"
                                name="description"
                                labelText="Description"
                                defaultValue={widget && widget.description}
                                onInput={e => {
                                    this.state.widget.description = e.target.value
                                    this.forceUpdate()
                                }}
                                required
                            />
                        </div>
                        <EditableAvatar
                            className={classNames.Avatar}
                            onClick={e =>
                                this.setState({
                                    dialogIsVisible: true
                                })
                            }
                            src={this.state.widget && this.state.widget.image}
                        />
                    </div>
                    <div>
                        <ColorSelector
                            label="テーマ色"
                            onChange={(rgba) => {
                                this.state.widget.colors.main = rgba
                                this.forceUpdate()
                            }}
                            color={this.state.widget && this.state.widget.colors.main}
                        />
                        <ColorSelector
                            label="タイトル文字色"
                            onChange={(rgba) => {
                                this.state.widget.colors.title = rgba
                                this.forceUpdate()
                            }}
                            color={this.state.widget && this.state.widget.colors.title}
                        />
                        <ColorSelector
                            label="サブタイトル文字色"
                            onChange={(rgba) => {
                                this.state.widget.colors.subtitle = rgba
                                this.forceUpdate()
                            }}
                            position="top"
                            color={this.state.widget && this.state.widget.colors.subtitle}
                        />
                        <ColorSelector
                            label="説明文字色"
                            onChange={(rgba) => {
                                this.state.widget.colors.description = rgba
                                this.forceUpdate()
                            }}
                            color={this.state.widget && this.state.widget.colors.description}
                        />
                        <ColorSelector
                            label="訪問者発言文字色"
                            onChange={(rgba) => {
                                this.state.widget.colors.visitor_message.text = rgba
                                this.forceUpdate()
                            }}
                            position="top"
                            color={this.state.widget && this.state.widget.colors.visitor_message.text}
                        />
                        <ColorSelector
                            label="訪問者発言背景色"
                            onChange={(rgba) => {
                                this.state.widget.colors.visitor_message.background = rgba
                                this.forceUpdate()
                            }}
                            position="top"
                            color={this.state.widget && this.state.widget.colors.visitor_message.background}
                        />
                        <ColorSelector
                            label="オペレーター発言文字色"
                            onChange={(rgba) => {
                                this.state.widget.colors.user_message.text = rgba
                                this.forceUpdate()
                            }}
                            position="top"
                            color={this.state.widget && this.state.widget.colors.user_message.text}
                        />
                        <ColorSelector
                            label="オペレーター発言背景色"
                            onChange={(rgba) => {
                                this.state.widget.colors.user_message.background = rgba
                                this.forceUpdate()
                            }}
                            position="top"
                            color={this.state.widget && this.state.widget.colors.user_message.background}
                        />
                    </div>
                    <LinearLayout
                        orientation="horizontal"
                    >
                        <FlexibleSpace/>
                        <Button
                            component="button"
                        >
                            送信
                        </Button>
                    </LinearLayout>
                </form>
                <SendImageDialog
                    visible={this.state.dialogIsVisible}
                    title="ウィジェット画像 編集"
                    onCancel={_ =>
                        this.setState({dialogIsVisible: false})
                    }
                    onSubmit={async e => {
                        e.preventDefault()
                        let form  = e.target
                        let image = form.elements["image"].files
                        
                        await createImage(image)
                        
                        this.setState({
                            dialogIsVisible: false
                        })
                    }}
                    name="image"
                />
            </div>
        )
    }
}
