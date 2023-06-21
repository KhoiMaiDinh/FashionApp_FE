import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {React, useState} from 'react';
import color from '../../../../../constants/color';
import FONT_FAMILY from '../../../../../constants/fonts';
import scale from '../../../../../constants/responsive';
import {LineBottom} from '../../../../../components/footer/images';
import {IC_Success} from '../../../../../assets/icons';
import PriceAttribute from '../../../orders/components/priceAttribute';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import YesNoMessageBox from '../../../../../components/messageBox/YesNoMessageBox';
import OKMessageBox from '../../../../../components/messageBox/OKMessageBox';

const OrderSuccess = props => {
  const {data} = props.route.params;
  const axiosPrivate = useAxiosPrivate();
  const [visible, setVisible] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  // console.log('------------',JSON.stringify(data))
  const cancelHandler = async id => {
    try {
      const response = await axiosPrivate.put(`/cancel-order/${id}`);
      console.log('cancelOrder', JSON.stringify(response.data));
      setCancelSuccess(true);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <OKMessageBox
        visible={cancelSuccess}
        clickCancel={() => props.navigation.navigate('HomeScreen')}
        title={'CANCELED'}
        message={'Your order was canceled!'}
      />
      <YesNoMessageBox
        visible={visible}
        onPressYes={() => cancelHandler(data.orderId)}
        onPressNo={() => props.navigation.navigate('HomeScreen')}
        title={'DO YOU WANT TO CANCEL ORDER?'}
        message={'Do you want to cancel your order?'}
      />
      <ScrollView>
        <View style={styles.introTextBox}>
          <Text style={styles.introText}>ORDER RECEIVED</Text>
          <IC_Success style={styles.icon} />
          <Text style={styles.successText}>Your order was success</Text>
          <Image
            source={LineBottom}
            style={{alignSelf: 'center', marginTop: scale(10)}}
          />
        </View>
        <View style={styles.body}>
          <View style={{flexDirection: 'column', marginBottom: scale(20)}}>
            <Text style={styles.userInformationText}>User Information:</Text>
            <Text style={styles.userText}>
              Name: {data.user.firstName + ' ' + data.user.lastName}
            </Text>
            <Text style={styles.userText}>
              Phone number: {data.user.phoneNumber}
            </Text>
            <Text style={styles.userText}>
              Order method:{' '}
              {data.methodValue === 5 ? 'Delivery' : 'PickUp at store'}
            </Text>
            {data.methodValue === 5 ? (
              <Text style={styles.userText}>
                Address:{' '}
                {data.address.streetAndNumber +
                  ', ' +
                  data.address.ward +
                  ', ' +
                  data.address.district +
                  ', ' +
                  data.address.city}
              </Text>
            ) : (
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.userText} numberOfLines={1}>
                  Shop's location: University Of Information Technology
                </Text>
                <Text style={styles.userText} numberOfLines={1}>
                  Contact number: (786) 713-8616
                </Text>
              </View>
            )}
            {data.note === '' ? null : (
              <Text style={styles.userText}>Note: {data.note}</Text>
            )}
          </View>
          <Image source={LineBottom} style={{alignSelf: 'center'}} />
          <Text style={styles.userInformationText}>Products:</Text>
          <ScrollView
            style={{
              flexDirection: 'column',
              height: scale(140),
              marginBottom: scale(15),
              borderBottomWidth: 1,
            }}>
            {data.productDetails.map(item => (
              <View key={item.detailId} style={{marginBottom: scale(10)}}>
                <PriceAttribute
                  key={item.detailId}
                  image={item.product.posterImage.url}
                  qty={item.qty}
                  name={item.product.name}
                  price={item.product.price}
                  sizeName={item.sizeName}
                  colorCode={item.colorCode}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.placeOrder}
          onPress={() => setVisible(true)}>
          <Text style={styles.button}>CANCEL</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.White,
    flexDirection: 'column',
  },
  introTextBox: {
    alignSelf: 'center',
    marginTop: scale(30),
  },
  introText: {
    color: color.TitleActive,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: FONT_FAMILY.Regular,
    letterSpacing: 4,
    alignSelf: 'center',
  },
  body: {
    marginTop: scale(20),
    marginLeft: scale(20),
    backgroundColor: color.White,
  },
  placeOrder: {
    marginBottom: scale(0),
    width: '100%',
    height: scale(56),
    backgroundColor: color.TitleActive,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  button: {
    color: color.White,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FONT_FAMILY.Regular,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'center',
    marginTop: scale(10),
    width: scale(150),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  successText: {
    color: color.TitleActive,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: FONT_FAMILY.Regular,
    marginTop: scale(10),
    alignSelf: 'center',
  },
  userInformationText: {
    color: color.TitleActive,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.BoldSecond,
  },
  userText: {
    color: color.TitleActive,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: FONT_FAMILY.RegularForAddress,
    marginTop: scale(5),
    marginLeft: scale(10),
  },
});
