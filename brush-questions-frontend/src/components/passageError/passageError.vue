<template>
  <transition name="el-fade-in">
    <div class="passage" v-if="get">
      <div class="qu" v-for="(passage, i) in passagesError" :key="passage.id">
        <div class="question" v-text="passage.question"></div>
        <el-checkbox-group v-model="selected[i]" v-if="passage.isSelect.length > 1"
          :class="isSubmit && selected[i] !== passage.isSelect ? 'answerError' : 'answer'">
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
      <div :class="isSubmit ? 'submit disabled' : 'submit'" v-if="passagesError.length > 0" @click="submit">提交</div>
      <empty v-if="isLoadingDown && passagesError.length == 0" :tips="'您本章节暂时没有错题数据！'"></empty>
    </div>
  </transition>
</template>

<script>
import { getWrongQuestion, deleteWrongQuestion } from "@/network/wrongQuestion/wrongQuestion";
import { ElMessageBox, ElMessage } from "element-plus";
import Bus from "@/common/eventBus";

export default {
  name: "passageError",
  data() {
    return {
      passagesError: [],
      selected: [],
      correctQuestion: [],
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
      this.isSubmit = false;
      this.getPassageError();
    }
  },
  methods: {
    async getPassageError() {
      this.selected = [];
      this.get = false;
      this.$loading();
      try {
        const { data: res } = await getWrongQuestion(localStorage.user_id, this.$store.state.book, this.$store.state.chapter);
        if (res.status !== 0) {
          ElMessage({
            message: res,
            grouping: true,
            type: 'error'
          });
        }
        this.passagesError = res.data;
      } catch (e) {
        console.log(e);
      }
      this.$loading().close();
      this.isLoadingDown = true;
      this.get = true;
    },
    async submit() {
      if (this.isSubmit) {
        return;
      }
      this.$loading();
      if (this.passagesError.length > this.selected.length) {
        await ElMessageBox.alert('您还未答完，确定提交', '提示', {
          confirmButtonText: '确定',
        });
      }
      this.isSubmit = true;
      //处理错题数据
      for (const i in this.passagesError) {
        if (this.selected[i] && this.passagesError[i].isSelect === Array.from(this.selected[i]).sort().join('')) {
          this.correctQuestion.push({ question_id: this.passagesError[i].question_id });
        }
      }
      for (const key in this.correctQuestion) {
        this.correctQuestion[key].user_id = localStorage.user_id;
      }
      //向后台发送数据
      try {
        if (this.correctQuestion.length > 0) {
          const { data: res } = await deleteWrongQuestion(this.correctQuestion);
          console.log(res);
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
    }
  },
  mounted() {
    // this.selected = JSON.parse(localStorage.getItem('selected'));
    Bus.on('init', () => {
      this.getPassageError();
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
      //color: #409eff;
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
