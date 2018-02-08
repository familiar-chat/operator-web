import React         from "react"
import Button        from "react-material/ui/view/Button"
import Card          from "react-material/ui/view/Card"
import FlexibleSpace from "react-material/ui/view/FlexibleSpace"
import IconToggle    from "react-material/ui/view/IconToggle"
import MaterialIcon  from "react-material/ui/view/MaterialIcon"
import Radio         from "react-material/ui/view/Radio"
import TextField     from "react-material/ui/view/form/TextField"

import classNames   from "familiar-client/ui/view/setting/trigger/condition/VisitCount/classNames"

export default ({
    condition,
    onOperateChange = operate => undefined,
    onMatchConditionChange = matchCondition => undefined,
    onValueChange = value => undefined,
    onAddValue = e => undefined,
    onDeleteValue = (value, index) => undefined,
    onDelete = e => undefined,
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
                訪問回数条件
            </div>
            <hr/>
            <Button
                onClick={onDelete}
            >
                削除
            </Button>
        </div>
        <div>
            {condition && condition.values.length > 1 &&
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
                    key={"visitCountCondition" + i}
                    className={classNames.ValueContent}
                >
                    <div>
                        <TextField
                            name="visitCount"
                            labelText="訪問回数"
                            hintText="回数を入力"
                            type="number"
                            autoFocus={true}
                            defaultValue={x.value}
                            required
                            onInput={e => onValueChange(e.target.value, i)}
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
                                enabled={x.match_condition == "equal"}
                                onClick={e => onMatchConditionChange("equal", i)}
                            />
                            一致
                        </div>
                        <div>
                            <Radio
                                enabled={x.match_condition == "not_less"}
                                onClick={e => onMatchConditionChange("not_less", i)}
                            />
                            以上
                        </div>
                        <div>
                            <Radio
                                enabled={x.match_condition == "not_greater"}
                                onClick={e => onMatchConditionChange("not_greater", i)}
                            />
                            以下
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
                    訪問回数条件を追加
                </Button>
            </div>
        </div>
    </Component>