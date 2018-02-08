import React         from "react"
import Button        from "react-material/ui/view/Button"
import Card          from "react-material/ui/view/Card"
import ViewPager     from "react-material/ui/view/ViewPager"
import FlexibleSpace from "react-material/ui/view/FlexibleSpace"
import IconToggle    from "react-material/ui/view/IconToggle"
import Image         from "react-material/ui/view/Image"
import MaterialIcon  from "react-material/ui/view/MaterialIcon"
import Radio         from "react-material/ui/view/Radio"
import TextField     from "react-material/ui/view/form/TextField"

import classNames   from "familiar-client/ui/view/setting/trigger/action/SendImageMessage/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex: 0
        })
    }

    render () {
        let {
            action,
            className,
            component = Card,
            Component = component,
            documentImages = [],
            onDelete = e => undefined,
            onImageChange = url => undefined,
            onSecoundChange = secound => undefined,
            ...props
        } = this.props;

        return (
            <Component
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
                        自動応答
                    </div>
                    <hr/>
                    <Button
                        onClick={onDelete}
                    >
                        削除
                    </Button>
                </div>
                <div>
                    <ViewPager
                        className={classNames.ImageSelector}
                        selectedIndex={this.state.selectedIndex}
                    >
                        <div>
                            <div>
                                <Image
                                    height="180"
                                    onClick={e => {
                                        this.setState({
                                            selectedIndex: 1
                                        })
                                    }}
                                    src={action.value}
                                    width="180"
                                />
                                <div
                                    onClick={e => {
                                        this.setState({
                                            selectedIndex: 1
                                        })
                                    }}
                                >
                                    画像を選択
                                </div>
                            </div>
                        </div>
                        <div>
                        {documentImages.map(x =>
                            <Image
                                className={classNames.DocumentImage}
                                onClick={e => {
                                    onImageChange(x.url)
                                    this.setState({
                                        selectedIndex: 0
                                    })
                                }}
                                src={x.url}
                                height="70"
                                width="70"
                            />
                        )}
                        </div>
                    </ViewPager>
                    <TextField
                        name="secound"
                        labelText="秒数"
                        autoFocus={true}
                        defaultValue={action.secound}
                        onInput={e => onSecoundChange(Number(e.target.value))}
                        type="number"
                        required
                    />
                </div>
            </Component>
        )
    }
}