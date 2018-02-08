import React         from "react"
import Button        from "react-material/ui/view/Button"
import Card          from "react-material/ui/view/Card"
import FlexibleSpace from "react-material/ui/view/FlexibleSpace"
import IconToggle    from "react-material/ui/view/IconToggle"
import MaterialIcon  from "react-material/ui/view/MaterialIcon"
import Radio         from "react-material/ui/view/Radio"
import TextField     from "react-material/ui/view/form/TextField"

import classNames   from "familiar-client/ui/view/setting/trigger/condition/Url/classNames"

export default ({
    condition,
    onOperateChange = operate => undefined,
    onMatchConditionChange = matchCondition => undefined,
    onAddValue = e => undefined,
    onDeleteValue = _ => undefined,
    onDelete = (value, index) => undefined,
    onValueChange = (value, index) => undefined,
    component=Card,
    Component=component,
    ...props
}) => 
    <Component
        className={classNames.Host}
        {...props}
    >
        <div>
            <div>
                URL条件
            </div>
            <hr/>
            <Button
                onClick={onDelete}
            >
                削除
            </Button>
        </div>
        <div>
            {condition.values && condition.values.length > 1 &&
                <div
                    className={classNames.Selector}
                >
                    <div>
                        <Radio
                            enabled={condition.operate == "and"}
                            onClick={e => onOperateChange("and")}
                        />
                        全て満たす
                    </div>
                    <div>
                        <Radio
                            enabled={condition.operate == "or"}
                            onClick={e => onOperateChange("or")}
                        />
                        いずれか満たす
                    </div>
                </div>
            }
            {(condition.values || []).map((x, i) => 
                <div
                    key={"urlCondition" + i}
                    className={classNames.ValueContent}
                >
                    <div>
                        <TextField
                            name="url"
                            labelText="url"
                            hintText="/sample/sample.html"
                            autoFocus={true}
                            defaultValue={x.value}
                            onInput={e => onValueChange(e.target.value, i)}
                            required
                        />
                        <IconToggle
                            onClick={e => onDeleteValue(x, i)}
                        >
                            <MaterialIcon>
                                remove_circle_outline
                            </MaterialIcon>
                        </IconToggle>
                    </div>
                    <div
                        className={classNames.Selector}
                    >
                        <div>
                            <Radio
                                enabled={x.match_condition == "perfect"}
                                onClick={e => onMatchConditionChange("perfect", i)}
                            />
                            完全一致
                        </div>
                        <div>
                            <Radio
                                enabled={x.match_condition == "forward"}
                                onClick={e => onMatchConditionChange("forward", i)}
                            />
                            前方一致
                        </div>
                        <div>
                            <Radio
                                enabled={x.match_condition == "backward"}
                                onClick={e => onMatchConditionChange("backward", i)}
                            />
                            後方一致
                        </div>
                    </div>
                </div>
            )}
            <div
                className={classNames.AddValueButton}
            >
                <FlexibleSpace/>
                <Button
                    onClick={onAddValue}
                >
                    URL条件を追加
                </Button>
            </div>
        </div>
    </Component>