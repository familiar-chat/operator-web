import React         from "react"
import Button        from "react-material/ui/view/Button"
import Dialog        from "react-material/ui/view/Dialog"
import DialogHeader  from "react-material/ui/view/DialogHeader"
import DialogBody    from "react-material/ui/view/DialogBody"
import DialogFooter  from "react-material/ui/view/DialogFooter"
import Radio         from "react-material/ui/view/Radio"
import Ripple        from "react-material/ui/effect/Ripple"

import classNames from "familiar-client/ui/view/setting/site/notification/SoundDialog/classNames"

module.exports = class extends React.Component {

    componentWillMount() {
        this.setState({
            selectedSound: undefined
        })
    }

    componentDidMount() {
    }

    render() {
        let {
            className,
            onCancel     = _ => undefined,
            onSelect     = _ => undefined,
            sounds       = [],
            visible      = false,
            ...props,
        } = this.props

        return (
            <div
                className={className}
            >
                <Dialog
                    visible={visible}
                    {...props}
                >
                    <DialogHeader>
                        サウンド選択
                    </DialogHeader>
                    <DialogBody
                        className={classNames.Body}
                    >
                        {sounds.map(x => <div
                            onClick={e => {
                                this.setState({selectedSound: x})
                            }}
                            key={x.id}
                            className={classNames.SoundItem}
                        >
                            <Radio
                                enabled={x == this.state.selectedSound}
                            />
                            {x.title}
                        </div>)}
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            type="flat"
                            onClick={e => {
                                onCancel()
                                this.setState({selectedSound: undefined})
                            }}
                        >
                            キャンセル
                        </Button>
                        <Button
                            component="button"
                            type="flat"
                            onClick={e => {
                                onSelect(this.state.selectedSound)
                                this.setState({selectedSound: undefined})
                            }}
                        >
                            選択
                        </Button>
                    </DialogFooter>
                    <audio
                        src={this.state.selectedSound && this.state.selectedSound.url}
                        preload="auto"
                        controls
                        className={classNames.Audio}
                        autoPlay
                    />
                </Dialog>
            </div>
        )
    }
}