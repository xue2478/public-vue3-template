# 动态表单
## 使用

## form

# attribute
| 参数       | 说明                                                         | 类型    | 默认值 | 可选值 |
| ---------- | ------------------------------------------------------------ | ------- | ------ | ------ |
| isGroup    | 是否为分组表单                                               | Boolean | false  |        |
| formConfig | el-form的相关配置，查看elementPlus,如{labelWidth:'80px'}     | Object  | {}     |        |
| config     | 渲染表单的json                                               |         |        |        |
| col        | 一行几列                                                     | Number  | 1      |        |
| cusModel   | 表单自定表单值，注意在config中设置了默认值后，为cusModel赋值{}，设置了默认的那个属性会恢复默认值 | Object  | {}     |        |

## formItem