import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import color from '../../constants/color';
import scale from '../../constants/responsive';
import FONT_FAMILY from '../../constants/fonts';
import {
  IMG_Collection,
  IMG_ModelFour,
  IMG_ModelOne,
  IMG_ModelThree,
  IMG_ModelTwo,
} from '../../assets/images';
import CollectionItem from '../listOfCollectionScreen/components/collectionItem';
import {IC_Backward, IC_BackwardArrow} from '../../assets/icons';
import BlogItem from './components/blogItem';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const ListOfBlogScreen = props => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getBlogs = async () => {
      try {
        const response = await axiosPrivate.get('/get-all-blog', {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setData(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    getBlogs();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.viewText}>
          <View style={styles.viewTitleText}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <IC_Backward stroke={color.White} />
            </TouchableOpacity>
            <Text style={styles.textTile}>List of blogs</Text>
          </View>
          <TouchableOpacity
            style={styles.viewTextLabel}
            onPress={() => props.navigation.navigate('AddBlog')}>
            <Text style={styles.textLabel}>Add blog</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView>
          {data.map((item, index) => (
            <BlogItem
              key={index}
              source={item.posterImage.url}
              name={item.title}
              onPress={() => props.navigation.navigate('EditBlog')}></BlogItem>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ListOfBlogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Dimensions.get('screen').height * 0.25,
    backgroundColor: color.TitleActive,
    elevation: 1,
    justifyContent: 'flex-end',
    paddingBottom: scale(30),
  },
  viewText: {
    // marginTop: scale(80),
  },
  viewTitleText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTile: {
    color: color.White,
    fontSize: 36,
    fontFamily: FONT_FAMILY.JoseFinSans,
    fontWeight: 700,
  },
  viewTextLabel: {
    marginLeft: scale(30),
    backgroundColor: color.Alto,
    width: scale(175),
    height: scale(36),
    alignItems: 'center',
    marginTop: scale(10),
  },
  textLabel: {
    color: color.TitleActive,
    fontSize: 24,
    fontFamily: FONT_FAMILY.JoseFinSans,
    fontWeight: 700,
  },
  viewSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(166),
    marginRight: scale(20),
    borderWidth: 1,
    borderColor: color.White,
  },
  textInput: {
    width: '70%',
    color: color.White,
  },
  viewIcon: {
    width: '30%',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: color.White,
  },
});