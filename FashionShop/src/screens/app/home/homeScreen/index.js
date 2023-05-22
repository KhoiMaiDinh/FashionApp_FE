import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect,useState } from 'react'
import Custom_Footer from '../../../../components/footer/Custom_Footer'
import Custom_ItemScrollView from './components/Custom_ItemScrollView'
import Custom_HomepageProd from '../../../../components/products/CustomHomepageProd'
import Custom_Tag1 from '../../../../components/tags/fill'
import scale from '../../../../constants/responsive'
import { IMG_Collection, IMG_Logo, IMG_ModelFour, IMG_ModelOne, IMG_ModelThree, IMG_ModelTwo } from '../../../../assets/images'
import {Sticker1,Sticker2,Sticker3,Sticker4,Sticker5} from './images'
import { LineBottom } from '../../../../components/footer/images'
import FONT_FAMILY from '../../../../constants/fonts'
import color from '../../../../constants/color'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'




const HomeScreen = (props) => {
  
  const [banners, setBanners] = useState([]);
  const [tags, setTags] = useState([]);
  const [suggestiveCollectionOne, setSuggestiveCollectionOne] = useState([]);
  const [suggestiveCollectionTwo, setSuggestiveCollectionTwo] = useState([]);
  const [suggestiveProduct, setSuggestiveProduct] = useState([]);
  
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const controller = new AbortController();

    const getBanners = async (number) => {
      try {
        const response = await axiosPrivate.get(`/get-random-collection/${number}`, {
          signal: controller.signal,
        });
        setBanners(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    const getTags = async () => {
      try {
        const response = await axiosPrivate.get(`/get-all-tag`, {
          signal: controller.signal,
        });
        setTags(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    // const getSuggestiveCollectionOne = async (number) => {
    //   try {
    //     const response = await axiosPrivate.get(`/get-random-product/${number}`, {
    //       signal: controller.signal,
    //     });
    //     setSuggestiveCollectionOne(response.data);
    //   } catch (err) {
    //     console.log(err.response.data);
    //   }
    // };
    // const getSuggestiveCollectionTwo = async (number) => {
    //   try {
    //     const response = await axiosPrivate.get(`/get-random-product/${number}`, {
    //       signal: controller.signal,
    //     });
    //     setSuggestiveCollectionOne(response.data);
    //   } catch (err) {
    //     console.log(err.response.data);
    //   }
    // };
    const getSuggestiveProduct = async (number) => {
      try {
        const response = await axiosPrivate.get(`/get-random-product/${number}`, {
          signal: controller.signal,
        });
        setSuggestiveProduct(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    getBanners(4);
    getTags();
    // getSuggestiveCollectionOne(1);
    // getSuggestiveCollectionTwo(1);
    getSuggestiveProduct(4);
    return () => {
      controller.abort();
    };
  }, []);

  


  return (
    <SafeAreaView style={styles.container}>
        {/* Header */}
        {/* <Custom_Header/> */}
        <ScrollView >
          {/* Banner */}
          <View style={styles.bannerContainer}>
            <SwiperFlatList
              showPagination
              paginationStyle={styles.wrapDot}
              paginationStyleItemActive={styles.dotActive}
              paginationStyleItemInactive={styles.dot}
              data={banners}
              renderItem={({ item }) => (
                <TouchableOpacity style={{width:Dimensions.get('window').width}} 
                key={item => `${item._id}`}
                onPress={() => props.navigation.navigate('CollectionStackScreen', 
                { screen: 'CollectionDetailScreen',
                  params: {data:item},
                }
                )} >
                  <Image source={{uri:`${item.posterImage.url}`}} style={styles.bannerWrap} resizeMode='stretch'></Image>
                </TouchableOpacity>
              )}
            />     
            <View style={styles.exploreButton}>
              <TouchableOpacity onPress={() => props.navigation.navigate('CollectionStackScreen', { screen: 'CollectionScreen' })}>
                <Text style={styles.exploreButtonText}>Explore Collection</Text>
              </TouchableOpacity>
            </View> 
          </View>
          {/* New Arrival */}
          <View style={styles.arrivalContainer}>
            <Text style={styles.arrivalText}>NEW ARRIVAL</Text>
            <Image source={LineBottom} style={{alignSelf: 'center'}} resizeMode='stretch'/>
            <FlatList
            contentContainerStyle={{alignContent: 'space-around',marginTop:scale(20)}}
            horizontal={false}
            data={suggestiveProduct}
            keyExtractor={item => `${item._id}`}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.wrapperArrival}
            renderItem={({item}) => (
              <View>
                <Custom_HomepageProd
                  width={165}
                  image={item.posterImage.url}
                  prodName={item.name}
                  prodPrice={item.price}
                  onPress={() => props.navigation.navigate('ProductDetailsScreen', {
                    data: item,
                  })}
                />
              </View>
            )}></FlatList>
            <TouchableOpacity onPress={() => props.navigation.navigate('CategoryGridViewAllScreen')}>
              <Text style={styles.exploreText}>Explore More ⇒</Text>
            </TouchableOpacity>
          </View>
          {/* Collection */}
          {/* <View style={styles.collectionContainer}>
            <Text style={styles.collectionText}>COLLECTIONS</Text>
            <TouchableOpacity style={{alignItems:'center', width:'100%'}} 
            onPress={() => props.navigation.navigate('CollectionStackScreen', { screen: 'CollectionDetailScreen' })}>
              <Image source={{uri:suggestiveCollectionOne.posterImage.url}} resizeMode='stretch' style={{width:'100%', marginTop:scale(15)}}/>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => props.navigation.navigate('CollectionStackScreen', { screen: 'CollectionDetailScreen' })}>
              <Image source={{uri:suggestiveCollectionTwo.posterImage.url}} resizeMode='stretch' style={{marginTop:scale(35)}}/>
            </TouchableOpacity>
          </View>         */}
          {/* Product */}
          <View style={styles.productContainer}>
            <Text style={styles.productText}>JUST FOR YOU</Text>
            <Image source={LineBottom} style={styles.lineBottom} resizeMode='cover'/>
            <SwiperFlatList
              showPagination
              paginationStyle={styles.wrapDot}
              paginationStyleItemActive={styles.dotActive}
              paginationStyleItemInactive={styles.dot}
              data={suggestiveProduct}
              renderItem={({ item }) => (
                <View key={item => `${item._id}`} style={styles.productWrap}>
                  <Custom_HomepageProd
                  height={387}
                  width={255}
                  image={item.posterImage.url}
                  prodName={item.name}
                  prodPrice={item.price}
                  onPress={() => props.navigation.navigate('ProductDetailsScreen', {
                    data: item,
                  })}
                  />
                </View>
              )}
            />      
          </View>
          {/* Trending */}
          <View style={styles.trendContainer}>
              <Text style={styles.trendingText}>@Trending</Text>
              <View style={styles.tagView}>
                {tags.map(item =>            
                      <Custom_Tag1
                        onPress={() => props.navigation.navigate('CategoryGridViewByIdScreen', {
                          data: item,
                        })}
                        key={item._id}
                        value={'#' + item.name}
                      />
                )}
              </View>
              
          </View>
          {/* Open Fashion */}
          <View style={styles.openFashionContainer}>
            <Image source={IMG_Logo} style={styles.openFashionText}/>
            <Image source={LineBottom} style={{alignSelf: 'center',marginTop: scale(5),}} resizeMode='stretch'/>
          </View>
          <Custom_Footer style={{justifyContent: 'flex-end'}} 
          onAboutPress={() => props.navigation.navigate('HomeStackScreen', { screen: 'OurStoryScreen' })}
          onContactPress={() => props.navigation.navigate('HomeStackScreen', { screen: 'ContactUsScreen' })}
          onBlogPress={() => props.navigation.navigate('BlogStackScreen', { screen: 'BlogGridViewScreen' })}
          />
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: color.OffWhite,
    },
    bannerContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    bannerWrap: {
      justifyContent:'center',
      alignSelf:'center',
      width:'100%',
      height:scale(450),
    },
    exploreButton:{
      position:'absolute',
      borderRadius:scale(30),
      paddingHorizontal:scale(30),
      paddingVertical:scale(8),
      flexDirection:'row',
      display:'flex',
      alignItems:'center',
      bottom: scale(43),
      backgroundColor:'rgba(0, 0, 0, 0.4)',
    },
    exploreButtonText: {

      fontFamily:FONT_FAMILY.Regular,
      fontSize:scale(16),
      lineHeight:scale(24),
      color:color.OffWhite,
    },
    arrivalContainer:
    {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: scale(32),
      paddingHorizontal: scale(16),
    },
    arrivalText: {
      fontSize: scale(18),
      lineHeight: scale(40),
      textAlign: 'center',
      fontFamily: FONT_FAMILY.Regular,
      color: color.TitleActive,
    },
    lineBottom:{
      alignSelf: 'center',
      marginTop: scale(30),
  },
    wrapperArrival:{
      marginBottom: scale(5),
  },
    wrapperBrand:{
      marginBottom: scale(35),
  },
  exploreText: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: scale(16),
    lineHeight: scale(24),
    textAlign: 'center',
    color: color.TitleActive,
  },
  brandContainer:
  {
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: scale(60),
  },
  collectionText: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize:scale(18),
    lineHeight:scale(40),
    color:color.TitleActive,
    letterSpacing:scale(4),
  },
  videoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  trendingText: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: scale(24),
    lineHeight: scale(60),
    textAlign: 'center',
    color: color.TitleActive,
  },
  tagView: {
    flexDirection:'row',
    justifyContent: 'space-around',
    flex: 1,
    flexWrap: 'wrap',
    paddingHorizontal: scale(30),
    marginHorizontal: scale(10),
  },
  productWrap: {
    justifyContent:'space-around',
    height:scale(380), 
    width: scale(265),
    alignItems:'center',
    flexDirection:'column', 
  },
  wrapDot: {
    flexDirection: 'row',
    alignSelf: 'center',   
    width: '100%',
  },
  dotActive: {
    margin: scale(1),
    color: color.TitleActive,
    width: scale(7),
    height: scale(7),
  },
  dot: {
    margin: scale(1),
    opacity: 0.27,
    color: color.White,
    size: 3,
    width: scale(7),
    height: scale(7),
  },
  productContainer:
  {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: scale(32),
    paddingHorizontal: scale(16),
  },
  productText: {
    fontSize: scale(18),
    lineHeight: scale(40),
    textAlign: 'center',
    fontFamily: FONT_FAMILY.Regular,
    color: color.TitleActive,
  },
  openFashionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: scale(32),
    paddingHorizontal: scale(16),
    marginBottom:scale(18),
  },
  openFashionText: {
    width:scale(230),
    height:scale(200),
  },
  stickerView: {
    width:scale(155),
    height:scale(82),
    paddingHorizontal: scale(8),
    paddingVertical: scale(6),
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: scale(6),
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'space-around',
    marginLeft:scale(18),
  },
})