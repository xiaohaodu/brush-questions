<template>
  <transition name="el-fade-in">
    <div class="passage" v-if="get">
      <div class="qu" v-for="(passage, i) in passages" :key="passage.id">
        <div class="question" v-text="passage.question"></div>
        <el-checkbox-group v-model="selected[i]" v-if="passage.isSelect.length > 1">
          <el-checkbox :label="select[0]" v-for="(select, i) in passage.select" :key="i" :disabled="isSubmit">{{
            select }}</el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-model="selected[i]" v-else
          :class="isSubmit && selected[i] !== passage.isSelect ? 'answerError' : 'answer'">
          <el-radio :label="select[0]" v-for="(select, i) in passage.select" :key="i" :disabled="isSubmit">{{
            select }}</el-radio>
        </el-radio-group>
        <div
          :class="this.selected[i] ? (Array.from(this.selected[i]).sort().join('') === passage.isSelect ? 'realAnswer' : 'realAnswerError') : 'realAnswerError'"
          v-if="isSubmit">
          正确答案：{{ passage.isSelect }}
        </div>
      </div>
      <div :class="isSubmit ? 'submit disabled' : 'submit'" v-if="passages.length > 0" @click="submit">提交</div>
      <empty v-if="isLoadingDown && passages.length == 0" :tips="'本章暂无试题内容！'"></empty>
    </div>
  </transition>
</template>

<script>
import { get_passage } from "@/network/passage/get_passage";
import { postWrongQuestion } from "@/network/wrongQuestion/wrongQuestion";
import { ElMessageBox, ElMessage } from "element-plus";
import Bus from "@/common/eventBus";

export default {
  name: "passagePage",
  data() {
    return {
      passages: [],
      selected: [],
      wrongQuestion: [],
      get: true,
      isSubmit: false,
      isLoadingDown: false,
    };
  },
  computed: {
    chapter() {
      return this.$store.state.chapter;
    }
  },
  watch: {
    chapter() {
      this.selected = [];
      this.isSubmit = false;
      this.getPassage();
    }
  },
  methods: {
    async getPassage() {
      this.get = false;
      this.$loading();
      try {
        const { data: res } = await get_passage(this.$store.state.book, this.$store.state.chapter);
        if (res.status !== 0) {
          ElMessage({
            message: res,
            grouping: true,
            type: 'error'
          });
        }
        this.passages = res.data;
        this.isLoadingDown = true;
      } catch (e) {
        console.log(e);
      }
      this.$loading().close();
      this.get = true;
    },
    async submit() {
      if (this.isSubmit) {
        return;
      }
      if (this.passages.length > this.selected.length) {
        await ElMessageBox.alert('您还未答完，确定提交', '提示', {
          confirmButtonText: '确定',
        });
      }
      this.$loading();
      this.isSubmit = true;
      try {
        //处理错题数据
        for (const i in this.passages) {
          if (this.selected[i] && this.passages[i].isSelect !== Array.from(this.selected[i]).sort().join('')) {
            this.wrongQuestion.push(this.passages[i]);
          }
        }
        for (const key in this.wrongQuestion) {
          this.wrongQuestion[key].user_id = localStorage.user_id;
        }
        //向后台发送数据
        if (this.wrongQuestion.length > 0) {
          const { data: res } = await postWrongQuestion(this.wrongQuestion);
          if (res.status !== 0) {
            ElMessage({
              message: res,
              grouping: true,
              type: 'error'
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
      this.isSubmit = true;
      this.$loading().close();
    },
  },
  mounted() {
    // this.selected = JSON.parse(localStorage.getItem('selected'));
    Bus.on('init', () => {
      this.getPassage();
    });
  },
};
</script>

<style lang="scss" scoped>
@import "src/style/theme/theme";

.passage {
  width: 100vw;
  height: 92dvh;
  overflow-y: scroll;

  .qu {
    margin: 2vh;

    .answer {
      margin: 1vh;

      :deep(.el-radio__input.is-checked .el-radio__inner) {
        border-color: #409eff;
        background: #409eff;
      }
    }

    .answerError {
      margin: 1vh;

      :deep(.el-radio__input.is-checked .el-radio__inner) {
        border-color: #cc1133;
        background: #cc1133;
      }
    }

    .realAnswer {
      color: #409eff;
    }

    .realAnswerError {
      color: #cc1133;
      // color: #409eff;
    }
  }

  :deep(.el-radio__label) {
    @include theme-color2
  }

  :deep(.el-radio__inner) {
    @include theme-color
  }

  .submit {
    margin-left: 20vw;
    margin-bottom: 2vw;
    background-color: #409eff;
    color: white;
    width: 60px;
    height: 30px;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    user-select: none;
    cursor: pointer;
  }

  .disabled {
    background-color: #7b7d81;
  }
}
</style>