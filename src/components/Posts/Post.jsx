import {Box, Image, Badge, Button} from "@chakra-ui/react"
import publicPostIcon from '../../img/icons/PublicPostIcon.png'
import FriendsPostIcon from '../../img/icons/FriendsPostIcon.png'
import GroupChatPostIcon from '../../img/icons/GroupChatPostIcon.png'
import { useTranslation } from "react-i18next"
import { useState } from "react"
const getPostTypeIcon = (postType) => {
    if(postType === 'Public'){
        return publicPostIcon
    }
    if(postType === 'Friends'){
        return FriendsPostIcon
    }
    if(postType === 'Group'){
        return GroupChatPostIcon
    }
    return null
}
const Post = ({post}) => {
    const property = {
      imageUrl: 'https://cdn.shibe.online/shibes/54e2950bdc7710f2625867582058f940e51f7117.jpg',
      imageAlt: 'piesel',
      nameFirst: 'Wiktor',
      nameLast: 'Morawski',
      postType: 'Public',
      content: 'Cześć, właśnie robię stronę w REACT-cie 🤪',
      likes: 12,
    }
    const [hiddenContent, setHiddenContent] = useState(true)

    const { t } = useTranslation();

    return (
      <Box borderWidth='1px' borderRadius='lg' overflow='hidden' bgColor="rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(50px)"
      className="blur"
      bgColor="rgba(255, 255, 255, 0.2)">
  
        <Box p='6'>
          <Box display='flex' alignItems='baseline' justifyContent='space-between' alignItems='center'>
            <Badge borderRadius='full'  colorScheme='teal'>
                <Image boxSize='50' src={property.imageUrl} alt={property.imageAlt}  borderRadius='full'/>
            </Badge>
            <Box
              
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xl'
              textTransform='capitalization'
              ml='2'
            >
              {property.nameFirst} {property.nameLast}
            </Box>
            <Box 
                tex="right"
                color='gray.500'
            >
                {getPostTypeIcon(property.postType) ? <Box display='flex'><Image marginRight='10px' boxSize='25px' src={getPostTypeIcon(property.postType)}  borderRadius='full'></Image> {property.postType}</Box> : property.postType}
            </Box>
          </Box>
  
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated={hiddenContent}
            onClick={() => setHiddenContent(!hiddenContent)}
          >
            {property.content}
          </Box>
  
          <Box display='flex' mt='2' alignItems='center'>
            
            <Box color='gray.300' fontSize='sm' textShadow="sm">
                {property.feeling} (TUTAJ DOROBIĆ nastrój w poście.)  😎🤬🤢
            </Box>
          </Box>
        </Box>
        <Image src={property.imageUrl} alt={property.imageAlt} />
        <Box display="flex" flexWrap='wrap' justifyContent="space-between">
            <Box padding='2'>
                {t('likes')} {property.likes}
            </Box>
            <Button padding='2'>
                {t('iLikeIt')}
            </Button>
            <Box padding='2'>
                {t('postBottomCommentBoxTitle')}
            </Box>
            <Box padding='2' borderRadius="full" backgroundColor="gray.500" flexBasis='100%'>
                {t('writeCommentPlaceHolder')}
            </Box>
        </Box>
      </Box>
    )
}
export default Post