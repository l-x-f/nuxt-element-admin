<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :validate-on-rule-change="false"
    >
      <!-- 设置语言 -->
      <set-language class="set-language" />

      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>

      <el-form-item prop="account">
        <el-input
          v-model="loginForm.account"
          :placeholder="$t('login.accountPlaceholder')"
          name="account"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          :placeholder="$t('login.passwordPlaceholder')"
          name="password"
          auto-complete="on"
          show-password
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        size="large"
        style="width: 100%"
        @click.native.prevent="handleLogin"
      >
        {{ $t('login.login') }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SetLanguage from '@/components/SetLanguage'
const title = process.env.NUXT_APP_WEB_TITLE

export default {
  name: 'LoginPage',
  layout: 'login',
  components: {
    SetLanguage
  },
  data() {
    return {
      title,
      loginForm: {
        account: '',
        password: '',
        area: '',
        terminalVersion: '',
        equipmentName: '',
        macAddress: '',
        operatingSystem: ''
      },
      loginRules: {
        account: [
          {
            required: true,
            trigger: 'blur',
            message: this.$t('login.accountPlaceholder')
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: this.$t('login.passwordPlaceholder')
          }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters('app', ['language'])
  },
  methods: {
    async handleLogin() {
      try {
        this.loading = true
        await this.login(this.loginForm)
        this.$message.success(this.$t('login.loginSuccessTip'))
        this.$router.push({ path: '/home' })
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    ...mapActions(['login'])
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #99a9bf;
  min-height: 100vh;
  position: relative;

  .login-form {
    box-sizing: border-box;
    width: 500px;
    height: 400px;
    border-radius: 5px;
    padding: 40px 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    .title-container {
      text-align: center;
      padding-bottom: 20px;
      .logo {
        width: 45px;
        height: auto;
      }
      .title {
        font-size: 26px;
        font-weight: border;
        text-align: center;
        margin-top: 13px;
        color: #333;
      }
    }
    .set-language {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>
