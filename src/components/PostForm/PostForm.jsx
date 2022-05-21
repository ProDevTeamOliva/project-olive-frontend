import {
  Button,
  Box,
  Input,
  RadioGroup,
  Radio,
  Textarea,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Formik, Form, Field } from "formik";
import { memo, useRef, useState } from "react";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addPost } from "../../actions/postActions";
import toBase64 from "../../operations/base64";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import { BsFillImageFill } from "react-icons/bs";
// https://github.com/twbs/icons
import { validatorOfContent } from "../../validators/validatorOfContent";
import { postTypeIcon } from "../Posts/Post/postTypeIcon";
import InfoAboutMeV2 from "../Me/InfoAboutMeV2";
import Carousel from "../Images/CarouselAddPost";
import { v4 as uuidv4 } from "uuid";
import { validatorOfFiles } from "../../validators/validatorOfFiles";
import Alert from "../Alert/Alert";

const initialData = {
  content: "",
  type: "public",
  selectedFiles: [],
};

function PostForm({ onClose }) {
  const { t } = useTranslation();
  const languageValues = {
    addPostContentPlaceHolder: t("addPostContentPlaceHolder"),
    postType: t("postType"),
    selectFile: t("selectFile"),
    submitPostAdd: t("submitPostAdd"),
    required: t("required"),
    formatFile: t("formatFile"),
    memoryPerFile: t("memoryPerFile"),
    memoryAllFiles: t("memoryAllFiles"),
    addingPost: t("addingPost"),
    alertAddPost: t("alertAddPost"),
    maxSizeOfContent: t("maxSizeOfContent"),
  };

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const onCloseAlert = () => setIsOpen(false);
  const cancelRef = useRef();

  const [formValues, setFormValues] = useState(initialData);

  const getHashtags = (val) => {
    const splittedContent = val.split(/[ ,.]/g);
    const hashtags = [];
    for (const idx in splittedContent) {
      if (splittedContent[idx].charAt(0) === "#") {
        hashtags.push(splittedContent[idx].slice(1).toLowerCase());
      }
    }
    return hashtags;
  };

  const handleSubmit = (values) => {
    setIsOpen(true);
    return setFormValues(values);
  };

  const sendPost = async () => {
    onCloseAlert();
    onClose();
    const hashtags = getHashtags(formValues.content);
    const { selectedFiles, ...payload } = formValues;
    payload.tags = hashtags;
    if (formValues.selectedFiles.length > 0) {
      const imagesConvertedToBase64 = [];
      for (const file of formValues.selectedFiles) {
        const file64 = await toBase64(file.file);
        imagesConvertedToBase64.push({
          filename: file.file.name,
          picture: file64,
        });
      }
      return dispatch(
        addPost({
          ...payload,
          pictures: imagesConvertedToBase64,
        })
      );
    } else {
      return dispatch(
        addPost({
          ...payload,
          pictures: [],
        })
      );
    }
  };

  const addIdForFiles = (files) =>
    Array.from(files).map((file) => ({ file, id: uuidv4() }));

  const addFiles = (event) => {
    setFormValues({
      ...formValues,
      selectedFiles: [
        ...formValues.selectedFiles,
        ...addIdForFiles(event.target.files),
      ],
    });
    document.getElementById("input-file").value = "";
  };

  const dropFile = (event) => {
    event.preventDefault();
    setFormValues({
      ...formValues,
      selectedFiles: [
        ...formValues.selectedFiles,
        ...addIdForFiles(event.dataTransfer.files),
      ],
    });
  };

  const removeFile = (id) => {
    setFormValues({
      ...formValues,
      selectedFiles: Array.from(formValues.selectedFiles).filter(
        (file) => id !== file.id
      ),
    });
  };

  const changeType = (value) => {
    setFormValues({ ...formValues, type: value });
  };
  const allow = (event) => {
    event.preventDefault();
  };

  const changeContent = (event) => {
    event.preventDefault();
    setFormValues({ ...formValues, content: event.target.value });
  };

  const incHeightForContent = (event) => {
    event.target.style.height = "inherit";
    event.target.style.height = `${event.target.scrollHeight + 50}px`;
  };

  const validateContent = validatorOfContent(
    languageValues.required,
    languageValues.maxSizeOfContent
  );
  const validateFiles = validatorOfFiles(
    languageValues.formatFile,
    languageValues.memoryPerFile,
    languageValues.memoryAllFiles
  );

  return (
    <Box px="20px" py="15px">
      <Formik
        enableReinitialize
        initialValues={formValues}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          initialValues: { content, type, selectedFiles },
        }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <Field name="type">
                {({ field, form }) => (
                  <FormControl
                    id="type"
                    isInvalid={form.errors.type && form.touched.type}
                  >
                    <HStack justify="right">
                      <RadioGroup
                        {...field}
                        id="type"
                        style={{ touchAction: "none" }}
                      >
                        {Object.keys(postTypeIcon).map((value, index) => {
                          const Icon = postTypeIcon[value];
                          return (
                            <Radio
                              {...field}
                              value={value}
                              onChange={() => changeType(value)}
                              key={index}
                              style={{ touchAction: "none" }}
                            >
                              <Tooltip label={t(value)}>
                                <Box>
                                  <Icon
                                    style={{
                                      marginRight: "10px",
                                      width: "40px",
                                      height: "40px",
                                      color: "#1A202C",
                                      // gray.800
                                    }}
                                  />
                                </Box>
                              </Tooltip>
                            </Radio>
                          );
                        })}
                      </RadioGroup>
                    </HStack>
                    <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Box my="15px">
                <InfoAboutMeV2 />
              </Box>

              <Field
                name="content"
                validate={(value) => validateContent(value)}
              >
                {({ field, form }) => (
                  <FormControl
                    id="content"
                    isInvalid={form.errors.content && form.touched.content}
                  >
                    <Textarea
                      id="content"
                      name="content"
                      {...field}
                      onChange={(event) => changeContent(event)}
                      placeholder={languageValues.addPostContentPlaceHolder}
                      _placeholder={{
                        color: "gray.900",
                      }}
                      onDrop={(event) => dropFile(event)}
                      onDragOver={(event) => allow(event)}
                      height="150px"
                      color="black"
                      onKeyDown={(event) => incHeightForContent(event)}
                      {...unStyledButton}
                    />
                    <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field
                name="selectedFiles"
                validate={(value) => validateFiles(value)}
              >
                {({ field, form }) => (
                  <FormControl
                    id="selectedFiles"
                    isInvalid={
                      form.errors.selectedFiles && form.touched.selectedFiles
                    }
                  >
                    <Carousel files={selectedFiles} removeFile={removeFile} />
                    <FormErrorMessage mt="25px">
                      {form.errors.selectedFiles}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <HStack justify="right" mt="20px">
                <Button
                  {...unStyledButton}
                  onClick={() => document.getElementById("input-file").click()}
                >
                  <BsFillImageFill
                    style={{
                      width: "40px",
                      height: "40px",
                      color: "#1A202C",
                      // gray.800
                    }}
                  />
                  <Input
                    id="input-file"
                    name="file"
                    variant="unstyled"
                    display="none"
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    multiple
                    onChange={(event) => addFiles(event)}
                  />
                </Button>
              </HStack>
              <Button {...purpleButtonStyle} type="submit" mb="10px" mt="20px">
                {languageValues.submitPostAdd}
              </Button>
            </Form>
          </>
        )}
      </Formik>
      <Alert
        isOpen={isOpen}
        onCloseAlert={onCloseAlert}
        fun={sendPost}
        cancelRef={cancelRef}
        header={languageValues.addingPost}
        body={languageValues.alertAddPost}
      />
    </Box>
  );
}
export default memo(PostForm);
