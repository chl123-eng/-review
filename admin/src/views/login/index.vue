<template>
  <div class="login_container">
    <el-form class="form" :rules="formRules" :model="loginForm" ref="form">
      <div class="form_title">
        <h3>Login Form</h3>
      </div>
      <el-form-item prop="username">
        <div class="form_icon">
          <svg-icon icon-class="user"></svg-icon>
        </div>
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <div class="form_icon">
          <svg-icon icon-class="password"></svg-icon>
        </div>
        <el-input v-model="loginForm.password" :type="passwordType"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button class="form_button" type="primary" :loading="loading" @click="handleLogin"
        >Login</el-button
      >
    </el-form>
  </div>
</template>

<script>
import svgIcon from '@/components/svgIcon';
import { validUserName } from '@/utils/validate';
export default {
  components: { svgIcon },
  data() {
    const validataUserName = (rule, value, callback) => {
      if (!validUserName(value)) {
        callback(new Error('Please enter the correct user name'));
      } else {
        callback();
      }
    };
    const validataPassword = (rule, value, callback) => {
      if (value < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      passwordType: 'password',
      formRules: {
        username: [{ required: true, trigger: 'blur', validate: validataUserName }],
        password: [{ required: true, trigger: 'blur', validate: validataPassword }],
      },
      loading: false,
      redirect: null,
    };
  },
  watch: {
    $route: {
      handle: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
    },
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType == 'password' ? '' : 'password';
    },
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.login_container {
  .el-input {
    width: 85%;
    height: 50px;
    .el-input__inner {
      height: 50px;
      color: #fff;
      caret-color: #fff;
      padding: 12px 5px 12px 15px;
      background: transparent;
      border: 0px;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;

    .el-form-item__content {
      display: flex;
    }
  }
}
</style>
<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background: #283443;
  .form {
    width: 460px;
    padding: 200px 35px 0;
    margin: 0 auto;
    &_title {
      color: #eee;
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    &_icon {
      color: #889aa4;
      margin-left: 10px;
      display: flex;
      align-items: center;
    }
    .show-pwd {
      display: flex;
      align-items: center;
      margin-left: 10px;
      font-size: 16px;
      color: #eee;
      cursor: pointer;
      user-select: none;
    }
    &_button {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
