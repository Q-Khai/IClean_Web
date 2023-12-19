import * as Yup from "yup";

const ListQuestionValidation = Yup.object().shape({
  questioncontent: Yup.string().test({
    name: "questioncontent",
    test: (value, ctx) => {
      const index1 = value?.indexOf(">") ?? 0;
      const index2 = value?.lastIndexOf("<") ?? 0;
      const temp = value?.slice(index1 + 1, index2);
      if (temp === "<br>" || !temp) {
        return ctx.createError({
          message: "Nội dung câu hỏi không được để trống",
        });
      }
      return true;
    },
  }),
  answer1: Yup.string().test({
    name: "answer1",
    test: (value, ctx) => {
      const index1 = value?.indexOf(">") ?? 0;
      const index2 = value?.lastIndexOf("<") ?? 0;
      const temp = value?.slice(index1 + 1, index2);
      if (temp === "<br>" || !temp) {
        return ctx.createError({
          message: "Đáp án 1 không được để trống",
        });
      }
      return true;
    },
  }),
  answer2: Yup.string().test({
    name: "answer2",
    test: (value, ctx) => {
      const index1 = value?.indexOf(">") ?? 0;
      const index2 = value?.lastIndexOf("<") ?? 0;
      const temp = value?.slice(index1 + 1, index2);
      if (temp === "<br>" || !temp) {
        return ctx.createError({
          message: "Đáp án 2 không được để trống",
        });
      }
      return true;
    },
  }),
  answer3: Yup.string().test({
    name: "answer3",
    test: (value, ctx) => {
      const index1 = value?.indexOf(">") ?? 0;
      const index2 = value?.lastIndexOf("<") ?? 0;
      const temp = value?.slice(index1 + 1, index2);
      if (temp === "<br>" || !temp) {
        return ctx.createError({
          message: "Đáp án 3 không được để trống",
        });
      }
      return true;
    },
  }),
  answer4: Yup.string().test({
    name: "answer4",
    test: (value, ctx) => {
      const index1 = value?.indexOf(">") ?? 0;
      const index2 = value?.lastIndexOf("<") ?? 0;
      const temp = value?.slice(index1 + 1, index2);
      if (temp === "<br>" || !temp) {
        return ctx.createError({
          message: "Đáp án 4 không được để trống",
        });
      }
      return true;
    },
  }),
});

export {ListQuestionValidation};
