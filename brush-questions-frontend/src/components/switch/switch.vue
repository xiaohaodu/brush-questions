<template>
  <div :class="data_theme === 'dark' ? 'switch_open switch' : 'switch_close switch'" @click="change_theme()">
    <img class="switch__icon" src="@/assets/moon.svg" v-if="data_theme === 'dark'">
    <img class="switch__icon" src="@/assets/sun.svg" v-if="data_theme === 'bright'">
  </div>
</template>

<script>
export default {
  name: 'mySwitch',
  data() {
    return {
      data_theme: localStorage.getItem('theme'),
    };
  },
  watch: {
    data_theme: {
      handler(newVal) {
        localStorage.setItem('theme', newVal);
      }
    }
  },
  methods: {
    change_theme() {
      if (!this.data_theme || this.data_theme === 'dark') {
        window.document.documentElement.setAttribute('data-theme', 'bright');
        this.data_theme = 'bright';
      } else {
        window.document.documentElement.setAttribute('data-theme', 'dark');
        this.data_theme = 'dark';
      }
    },
    init() {
      let theme = localStorage.getItem('theme');
      // console.log(theme)
      if (!theme || theme === 'dark') {
        window.document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        window.document.documentElement.setAttribute('data-theme', 'bright');
        localStorage.setItem('theme', 'bright');
      }
    }
  },
  created() {
    this.init();
  }
}

</script>

<style lang="scss" scoped>
@keyframes open_to_close {
  0% {
    left: 4.4vh;
  }

  100% {
    left: 0;
  }
}

@keyframes close_to_open {
  0% {
    left: 0;
  }

  100% {
    left: 4.4vh;
  }
}

.switch {
  transform: scale(0.7);
}

.switch_open {
  position: relative;
  width: 8vh;
  height: 4vh;
  border-radius: 2vh;
  background-color: #4a4b4d;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.5s;

  .switch__icon {
    position: absolute;
    border-width: 2px 2px 2px 2px;
    width: 3.6vh;
    height: 3.6vh;
    left: 4.4vh;
    border-radius: 1.8vh;
    background-color: #141414;
    animation: close_to_open 0.3s;
  }
}

.switch_close {
  position: relative;
  width: 8vh;
  height: 4vh;
  border-radius: 2vh;
  background-color: #f2f2f2;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.5s;

  .switch__icon {
    position: absolute;
    border-width: 2px 2px 2px 2px;
    width: 3.6vh;
    height: 3.6vh;
    border-radius: 1.8vh;
    background-color: #ffffff;
    animation: open_to_close 0.3s;
  }
}
</style>
