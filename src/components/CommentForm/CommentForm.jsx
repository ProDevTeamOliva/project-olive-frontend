import { Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputComponent from "../Inputs/InputComponent";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";
import { useTranslation } from "react-i18next";
import { validatorOfRequired } from "../../validators/validatorOfRequired";
import { useDispatch } from "react-redux";
import { addComment } from "../../actions/commentActions";

const initialData = {
  comment: "",
};

function CommentForm({ idPost }) {
  const { t } = useTranslation();
  const languageValues = {
    addComment: t("addComment"),
    writeCommentPlaceHolder: t("writeCommentPlaceHolder"),
    required: t("required"),
  };

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    // onClose();
    dispatch(addComment({ comment: values.comment }, idPost));
  };
  const validateRequired = validatorOfRequired(languageValues.required);

  return (
    <Box p="20px" w="100%">
      <Formik initialValues={initialData} onSubmit={handleSubmit}>
        {({ handleSubmit, initialValues: { comment } }) => (
          <Form onSubmit={handleSubmit}>
            <InputComponent
              namePlaceholder={languageValues.writeCommentPlaceHolder}
              nameFormLabel=""
              id="comment"
              type="text"
              validate={(value) => validateRequired(value)}
              value={comment}
              color="gray.800"
              borderColor="gray.600"
              autoComplete="off"
            />
            <Button type="submit" mb="10px" mt="30px" {...purpleButtonStyle}>
              {languageValues.addComment}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default CommentForm;
