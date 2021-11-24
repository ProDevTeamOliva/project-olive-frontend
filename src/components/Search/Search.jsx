import { Input } from "@chakra-ui/input";
import {useTranslation} from 'react-i18next'
const Search = () => {
  const { t } = useTranslation()
  return (
    <Input
      variant="unstyled"
      placeholder={t('SearchNavBar')}
      w={["50%", "80%", "50%", "40%", "30%"]}
      bgColor="rgba(255, 255, 255, 0.2)"
      border="none"
      borderRadius="10px"
      p="0 30px"
      lineHeight="40px"
      _placeholder={{ color: "white" }}
      display={["none", "block"]}
    />
  );
};

export default Search;
