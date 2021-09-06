<script>
export default {
  name: 'CustomTag',
  functional: true,
  props: {
    text: {
      type: [String, Number],
      default: ''
    }
  },
  render(_, { props, data, listeners }) {
    const type = ['', 'success', 'info', 'warning', 'danger']
    const getType = () => type[Math.floor(Math.random() * 5)]
    return (
      <ElTag
        closable
        style={{ display: 'inline-block', marginRight: '10px' }}
        type={getType()}
        attrs={data.attrs}
        on={listeners}
      >
        {props.text}
      </ElTag>
    )
  }
}
</script>
