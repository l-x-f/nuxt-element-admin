export default {
  watchQuery: ['selfPage'],
  methods: {
    $refresh() {
      const { path, query } = this.$route
      const selfPage = Math.random().toString(36).substring(2, 15) + +new Date()
      this.$router.replace({ path, query: { ...query, selfPage } })
    }
  }
}
