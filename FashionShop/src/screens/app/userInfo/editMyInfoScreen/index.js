import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Button,
} from 'react-native';
import React from 'react';
import color from '../../../../constants/color';
import FONT_FAMILY from '../../../../constants/fonts';
import {IMG_Logo} from '../../../../assets/images';
import scale from '../../../../constants/responsive';
import {
  IC_BackwardArrow,
  IC_Address,
  IC_Phone,
  IC_Email,
  IC_Password,
  IC_Edit,
} from '../../../../assets/icons';
import {Avatar, Title, Caption} from 'react-native-paper';
import {useState} from 'react';
import SaveButton from '../../../../components/buttons/Save';
import {ScrollView} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import Popup from './component/popup';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const signUpPayloadSchema = yup.object({
  firstName: yup
    .string()
    .max(30, 'Invalid name')
    .required('Name cannot be blank'),
  lastName: yup
    .string()
    .max(30, 'Invalid name')
    .required('Name cannot be blank'),
  // email: yup
  //   .string()
  //   .email('Invalid email')
  //   .max(50, 'Email length must be less than 50 characters')
  //   .required('Email cannot be blank'),
  phoneNumber: yup
    .string()
    // .min(10, 'Invalid phone number')
    // .max(11, 'Invalid phone number')
    .matches(phoneRegExp, 'Invalid phone number'),
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Password must contain uppercase, lowercase and number characters',
    )
    .min(8, 'Password length must be more than 8 characters')
    .max(16, 'Password length must be less than 16 characters')
    .required('Password can not be blank'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const EditMyInfoScreen = props => {
  const oldUserInfo = props.route.params.userInfo;
  console.log({oldUserInfo});
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [passConfirm, setPassConfirm] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXU1NT////R0dHz8/Pg4ODc3Nz8/PzV1dXw8PDt7e35+fnj4+P29vbv7+/n5+fd3d10rjpNAAAEeUlEQVR4nO2d2ZqqMBCEoQFZxfd/20OGYeQoqGB6SVL/pVfUl6S7s3SZZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHASWtD+EAaI6qof26ZwNO3YV3VEQimrxqLLH+mKscoiEElZ2Vye1C1cmjJwkVS1+/J+RbZVwBrL4Y28maHU/tBzUPm89vboyvDGkarPxu9vHEObq/X1kD7Htdb+6ANQ+S6+bHEJZ6pSe0Kfow1DItXHVuCaoQ5BY3Vmhi5cKu3PfwuVX+hzWF+M1H8pMM970xI9CLQt8espOmN4olZeBOa52XBTfxNF11ysljfn8+Ajg7aUTU5XMluYrG78RJkFg1tGb4twxt5SpOPbpddcrc1TX4nijrGUQf7i6MJgaxD9hpkZU8GGPj90+pzO0iByDKGpQWRYhQ5DK9F/IJ0xE06958IFO7Wb33LmjpnChifOOIzEGmrYFDZGpinXJJ2mqba0Ga5I6rARTUdGhaO2OAcVjAoLCwuRpSZdMFGb1owC89xCRuQMNDZCjY+D/H16bXnTMuQMpVMw1V+IXo9JnzFQfDPWbA4DdRtrOjSREBNQyHOCsWDgJCMBhfHP0vhjafz5MPqaJv66NLuxKrxpy8tS2B/Gv8dP4JyG9azNgsIEzkvjP/NO4N4i+rsnxvtDbWELbHfAdt5FRX+Pn8BbjPjf0yTwJir+d20JvE2M/32p/wMpA0dQj3h+560tZ4Po3+on0G8Rf89MCn1P8feuJdB/6EeiZYEJ9AEn0MvtLD++68c3L3DiK08F7Y//kNO+GNof/in1aW+TUIYwi9+fZoJuBz2GbiGEmDX1YZ+owIbwB/rY6yu08bsTvV9b9uO5d92frd01dM+9H5xvYrPhm9jE4Zv4i/O+LBfvy2s7ls77Uvuj/EMUs4EpAAAAALI5ydcLf79EwbTzu41tMXTrXcalG4p2vNXBF6Y7ZuWr8jto23Kq+xdm5avxbPogjFkfmOQdeR1dBCaSqDpx1laFE3uoP3fqPVi/lPmF+vNPwLoANB45Q9zUaPzc7ajX/Ba2/ef9PDgxe0FDla83mJ3NYYz9xdA3XvNbmPOfp5vvjoSLrcsolu4uG11dM0zdznYWI1vjk5W2p4yvxdJEgyWnwEmitrgsAdcIZtMI/bXI7Bnh0I2oXv6x4x2qe0Zer7YFxSfDnr3099B79s0cRu9oBVRm35Y1SiWqzCKcUVmKzBZY/6PRqieSKO4opAxeW5pnxOMpWw/+HuK9+ZJhZkY42IilwjvCSVF+CIUHUWEIhQdRYwhFB1E8kM5IhlMVgXkuJ1Cu5P4fMZd9Vg+6V4h5gejEGYdQrBHcFz4itE9Um6Ri01R6V7FGZoehN0mFoqlKxbYgU7kpCpRJ+nq5wiGRLzSXochCVKq6FwSqb9FDxGckjhVl7ir2EPCP0sz3Dv6cz2tQ/h5+C3PZo+5n+G3odZOFwPZC4OL+NezX+uxvL97B/jZDte52sNfeUAiFUAiFAgrjzxa620OBDWL8NY1+XXr0g/8BrMpHSulajwYAAAAASUVORK5CYII=',
  );
  const handleEditingPassword = () => {
    setEditingPassword(!editingPassword);
    setPassConfirm('');
  };

  let options = {
    savePhotos: true,
    mediaType: 'photo',
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setImage(result.assets[0].uri);
    setVisible(false);
  };
  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setImage(result.assets[0].uri);
      setVisible(false);
    }
  };

  const user = useSelector(state => state.user);
  const {userItems} = user;
  const userInfo = userItems.user;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      // email: '',
      phoneNumber: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(signUpPayloadSchema),
  });

  const editProfile = data => {
    console.log(data);
  };
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.viewIcon}
            onPress={() => props.navigation.goBack()}>
            <IC_BackwardArrow />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => setVisible(true)}>
            <Avatar.Image source={{uri: image}} size={150} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.inputName}>
            <Controller
              name="firstName"
              control={control}
              render={({field: {onChange, value}}) => (
                <View>
                  <View style={styles.inputFirstName}>
                    <View style={styles.viewInput}>
                      <TextInput
                        onChangeText={firstName => [
                          onChange(firstName),
                          setFirstName(firstName),
                        ]}
                        placeholder={userInfo.firstName}
                        value={value}
                        placeholderTextColor={color.GraySolid}
                        style={styles.inputText}
                        keyboardType="default"
                      />
                    </View>
                  </View>
                  {errors?.firstName && (
                    <Text style={styles.textFailed}>
                      {errors.firstName.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({field: {onChange, value}}) => (
                <View>
                  <View style={styles.inputLastName}>
                    <View style={styles.viewInput}>
                      <TextInput
                        onChangeText={lastName => [
                          onChange(lastName),
                          setLastName(lastName),
                        ]}
                        placeholder={userInfo.lastName}
                        value={value}
                        placeholderTextColor={color.GraySolid}
                        style={styles.inputText}
                        keyboardType="default"
                      />
                    </View>
                  </View>
                  {errors?.lastName && (
                    <Text style={styles.textFailed}>
                      {errors.lastName.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
          {/* <Controller
            name="email"
            control={control}
            render={({field: {onChange, value}}) => (
              <View>
                <View style={styles.inputBox}>
                  <View style={styles.icon}>
                    <IC_Email />
                  </View>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={mail => [onChange(mail), setMail(mail)]}
                      placeholder="Email"
                      value={value}
                      placeholderTextColor={color.GraySolid}
                      style={styles.inputText}
                      keyboardType="default"
                    />
                  </View>
                </View>
                {errors?.email && (
                  <Text style={styles.textFailed}>{errors.email.message}</Text>
                )}
              </View>
            )}
          /> */}

          <Controller
            name="password"
            control={control}
            render={({field: {onChange, value}}) => (
              <View>
                <View style={styles.inputBox}>
                  <View style={styles.icon}>
                    <TouchableOpacity onPress={handleShowPassword}>
                      <IC_Password />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewInput}>
                    <TextInput
                      secureTextEntry={!showPassword}
                      onChangeText={password => [
                        onChange(password),
                        setPassword(password),
                      ]}
                      onFocus={handleEditingPassword}
                      value={value}
                      placeholder="Enter password"
                      placeholderTextColor={color.GraySolid}
                      style={styles.inputText}
                    />
                  </View>
                </View>
                {errors?.password && (
                  <Text style={styles.textFailedPass}>
                    {errors.password.message}
                  </Text>
                )}
              </View>
            )}
          />
          {editingPassword ? (
            <Controller
              name="passwordConfirm"
              control={control}
              render={({field: {onChange, value}}) => (
                <View>
                  <View style={styles.inputBox}>
                    <View style={styles.viewInput}>
                      <TextInput
                        secureTextEntry={!showPassword}
                        onChangeText={passConfirm => [
                          onChange(passConfirm),
                          setPassConfirm(password),
                        ]}
                        value={value}
                        placeholder="Confirm password"
                        placeholderTextColor={color.GraySolid}
                        style={styles.inputText}
                      />
                    </View>
                  </View>
                  {errors?.passwordConfirm && (
                    <Text style={styles.textFailedPass}>
                      {errors.passwordConfirm.message}
                    </Text>
                  )}
                </View>
              )}
            />
          ) : null}

          {/* phone number */}
          <Controller
            name="phoneNumber"
            control={control}
            render={({field: {onChange, value}}) => (
              <View>
                <View style={styles.inputBox}>
                  <View style={styles.icon1}>
                    <IC_Phone style={styles.iconPhone} />
                  </View>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={phone => [
                        onChange(phone),
                        setPhoneNumber(phone),
                      ]}
                      placeholder={userInfo.phoneNumber}
                      value={value}
                      placeholderTextColor={color.GraySolid}
                      style={styles.inputText}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
                {errors?.phoneNumber && (
                  <Text style={styles.textFailed}>
                    {errors.phoneNumber.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* address */}
          <View style={styles.inputBox1}>
            <View style={styles.icon1}>
              <IC_Address />
            </View>
            <TextInput
              multiline={true}
              onChangeText={address => setAddress(address)}
              placeholder="kp6, đường Hàn Thuyên, TP.Thủ a aĐức ahhhhhhhhhh"
              placeholderTextColor={color.PlaceHolder}
              style={styles.inputText}
              keyboardType="default"
            />
          </View>
          <View style={styles.buttonSignIn}>
            <SaveButton
              text={'Save Edit'}
              onPress={handleSubmit(editProfile)}
            />
          </View>
        </View>
        <Modal
          style={styles.viewModal}
          onBackdropPress={() => setVisible(false)}
          onBackButtonPress={() => setVisible(false)}
          isVisible={visible}>
          <Popup onPressUpload={openGallery} onPressCamera={openCamera}></Popup>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
};

export default EditMyInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.White,
  },
  header: {
    flex: 0.3,
    backgroundColor: color.TitleActive,
  },
  viewInput: {
    width: scale(295),
    height: scale(51),
    borderColor: color.GraySolid,
  },
  viewIcon: {
    marginLeft: scale(26),
    width: scale(40),
    height: scale(30),
    marginTop: scale(22),
    alignItems: 'center',
  },
  avatar: {
    top: scale(50),
    alignSelf: 'center',
  },
  body: {
    flex: 0.7,
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    width: '10%',
    marginBottom: scale(10),
    marginLeft: scale(5),
  },
  edit: {
    marginTop: scale(-35),
    marginLeft: scale(270),
  },
  icon1: {
    alignItems: 'center',
    width: '10%',
    marginBottom: scale(8),
    marginLeft: scale(5),
  },
  button: {
    marginTop: scale(-10),
    marginLeft: scale(150),
  },
  buttonTitle: {
    fontWeight: '400',
    fontSize: scale(12),
    color: color.TitleActive,
    fontFamily: FONT_FAMILY.JoseFinSansRegular,
  },
  inputName: {
    flexDirection: 'row',
    marginTop: scale(80),
    width: scale(295),
    justifyContent: 'space-between',
  },
  inputFirstName: {
    borderBottomWidth: 1,
    width: scale(107),
  },
  inputLastName: {
    borderBottomWidth: 1,
    width: scale(180),
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: scale(10),
    width: scale(295),
    height: scale(51),
    borderColor: color.GraySolid,
    borderBottomWidth: 1,
  },
  inputBox1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10),
    width: scale(295),
    // height: scale(51),
    borderColor: color.GraySolid,
    borderBottomWidth: 1,
  },
  inputName1: {
    color: color.TitleActive,
    fontSize: 16,
    marginLeft: scale(5),
  },
  inputText: {
    width: '85%',
    color: color.TitleActive,
    marginTop: scale(10),
    textAlignVertical: 'bottom',
    paddingHorizontal: scale(10),
    fontSize: scale(16),
    paddingBottom: scale(5),
  },
  inputPass: {
    color: color.TitleActive,
    fontSize: 16,
    top: scale(-5),
    marginLeft: scale(25),
  },
  buttonSignIn: {
    marginTop: scale(61),
  },
  viewModal: {
    width: '100%',
    backgroundColor: color.White,
    marginLeft: 0,
    marginTop: 'auto',
    flex: 0.2,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  textFailedPass: {
    alignSelf: 'flex-start',
    fontFamily: FONT_FAMILY.JoseFinSans,
    fontSize: scale(10),
    color: color.RedSolid,
    marginTop: scale(5),
    width: scale(295),
  },
  textFailed: {
    alignSelf: 'flex-start',
    fontFamily: FONT_FAMILY.JoseFinSans,
    fontSize: scale(10),
    color: color.RedSolid,
    marginTop: scale(5),
  },
});
