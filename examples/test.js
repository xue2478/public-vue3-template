export const broadband = [
  {
    type: 'select',
    label: '业务类型',
    prop: 'test1',
    rules: [{ required: true, message: '请选择业务类型' }],
    options: [
      { value: '1001001', label: '语音' },
      { value: '1001002', label: '宽带' }
    ],
    attrs: {
      placeholder: '请选择',
      disabled: true
    },
    defaultVal: '1001002'
  },
  { label: 'test', dvSlot: 'test' },
  {
    type: 'radio',
    label: '业务动作',
    prop: 'test2',
    rules: [{ required: true, message: '请选择业务动作' }],
    options: [
      { value: 'A', labels: '开通' },
      { value: 'M', labels: '变更' },
      { value: 'R', labels: '释放' },
      { value: 'S', labels: '停机' },
      { value: 'C', labels: '复机' }
    ],
    optionConfig: {
      label: 'labels'
    }
  },
  {
    type: 'input',
    label: '业务实例ID',
    prop: 'test3',
    rules: [{ required: true, message: '请输入业务实例ID' }],
    attrs: {
      placeholder: '请输入'
    }
  },
  {
    type: 'input',
    label: '流水号',
    prop: 'test4',
    rules: [{ required: true, message: '请输入流水号' }],
    attrs: {
      placeholder: '请输入流水号'
    }
  }
]
export const groupList = [
  {
    title: 'test1',
    col: 1,
    noTitle: true,
    children: [
      {
        slotName: 'testSlot',
        label: '业务类型',
        prop: 'serviceType',
        rules: [{ required: true, message: '请选择业务类型' }],
        options: [
          { value: '1001001', label: '语音' },
          { value: '1001002', label: '宽带' }
        ],
        attrs: {
          placeholder: '请选择',
          disabled: true
        },
        defaultVal: '1001002'
      },
      {
        type: 'select',
        label: '业务动作',
        prop: 'action',
        rules: [{ required: true, message: '请选择业务动作' }],
        options: [
          { value: 'A', labels: '开通' },
          { value: 'M', labels: '变更' },
          { value: 'R', labels: '释放' },
          { value: 'S', labels: '停机' },
          { value: 'C', labels: '复机' }
        ],
        optionConfig: {
          label: 'labels'
        }
      }
    ]
  },
  {
    title: 'test11',
    children: [
      {
        type: 'input',
        label: '业务实例ID',
        prop: 'serviceInstanceId',
        rules: [{ required: true, message: '请输入业务实例ID' }],
        attrs: {
          placeholder: '请输入'
        }
      },
      {
        type: 'input',
        label: 'IMSI',
        prop: 'IMSI',
        rules: [{ required: true, message: '请输入IMSI' }],
        attrs: {
          placeholder: '请输入IMSI'
        }
      },
      {
        type: 'input',
        label: '电话号码',
        prop: 'serviceNo',
        attrs: {
          placeholder: '请输入电话号码'
        }
      },
      {
        type: 'input',
        label: '流水号',
        prop: 'serialNumber',
        rules: [{ required: true, message: '请输入流水号' }],
        attrs: {
          placeholder: '请输入流水号'
        }
      }
    ]
  }
]
export const btnList = [
  { text: '新增版本', type: 'warning', method: 'addFun' },
  {
    method: '',

    type: 'warning',
    attrs: {
      plain: true,
      circle: true,
      icon: 'Search'
    }
  },
  { text: '禁用', type: 'text', method: '', content: 'test', tooltip: false },
  { text: '启用', type: 'text', method: '' },
  { text: '删除', type: 'text', method: '' },
  { text: '测试', type: 'text', method: '' }
]

export const columns = [
  { type: 'selection' },
  { label: '序号', type: 'index', align: 'center' },
  {
    label: '名称',
    prop: 'nickName',
    children: [
      { label: '姓', prop: 'nickName', align: 'center' },
      { label: '名', prop: 'nickName' }
    ],
    align: 'center'
  },
  { label: '邮箱', prop: 'userEmail' },
  // { label: '邮箱', prop: 'userEmail', labelSlot: 'labelSlot' },
  { label: '邮箱2', prop: 'userEmail', dvSlot: 'test' },
  {
    label: '操作',
    align: 'center',
    tdSlot: 'operate' // 自定义单元格内容的插槽名称
  }
]
export const tableDt = [
  // { nickName: 'test1', userEmail: '12345.98@com.cn' }
  // { nickName: 'test2', userEmail: '12345.98fff@com.cn' },
  { nickName: 'test3', userEmail: '12345.98ff1111111111@com.cn' }
]
