import React          from "react"
import {ChromePicker} from "react-color"

import classNames from "familiar-client/ui/view/setting/site/widget/ColorSelector/classNames"

let positions = {
    "top"   : classNames.PopoverTop,
    "bottom": classNames.PopoverBottom
}

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            viewed: false,
        })
    }

    render() {

        let {
            className,
            color,
            label,
            name,
            onChange = _ => undefined,
            position = "top",
            ...props
        } = this.props

        return (
            <div
                className={
                    [
                        classNames.Host,
                        className
                    ].join(" ")
                }
                {...props}
            >
                {label 
             && <span
                    className={classNames.Label}
                >
                    {label}
                </span>
                }
                <div
                    className={classNames.Swatch}
                >
                    <div
                        style={{
                            backgroundColor: color
                        }}
                        className={classNames.Color}
                        onClick={e => 
                            this.setState({viewed: !this.state.viewed})
                        }
                    />
                    {
                        this.state.viewed 
                     && <div
                            className={
                                [
                                    classNames.Popover,
                                    positions[position]
                                ].join(" ")
                            }
                        >
                            <div
                                className={classNames.Cover}
                                onClick={e => this.setState({viewed: false}) }
                            />
                            <ChromePicker
                                color={color}
                                onChange={color => {
                                    let rgba = "rgba(" + [
                                        color.rgb.r,
                                        color.rgb.g,
                                        color.rgb.b,
                                        color.rgb.a
                                    ].join(",") + ")"
                                    onChange(rgba, color)
                                }}
                            />
                        </div>
                    }
                </div>
                <input
                    name={name}
                    className={classNames.Input}
                />
            </div>
        )
    }
}

