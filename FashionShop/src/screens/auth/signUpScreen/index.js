import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import color from '../../../constants/color';
import FONT_FAMILY from '../../../constants/fonts';
import {IC_BackwardArrow} from '../../../assets/icons';
import scale from '../../../constants/responsive';
import SaveButton from '../../../components/buttons/Save';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import axiosClient, { axiosPrivate } from '../../../apis/axios';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const signUpPayloadSchema = yup.object({
  firstName: yup.string()
  .max(30,'Invalid name')
  .required('Name cannot be blank'),
  lastName: yup.string()
  .max(30,'Invalid name')
  .required('Name cannot be blank'),
  email: yup
    .string()
    .email('Invalid email')
    .max(50, 'Email length must be less than 50 characters')
    .required('Email cannot be blank'),
  phoneNumber: yup
    .string()
    .min(10,'Invalid phone number')
    .max(11,'Invalid phone number')
    .matches(phoneRegExp, 'Invalid phone number'),
  password: yup
    .string()
    .matches(passwordRegex,'Password must contain uppercase, lowercase and number characters')
    .min(8, 'Password length must be more than 8 characters')
    .max(16, 'Password length must be less than 16 characters')
    .required('Password can not be blank'),
  passConfirm: yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const SignUpScreen = (props) => {
  const {setAuth} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(signUpPayloadSchema),
  });

  const handleSignup = async (data) => {
    try {
      // console.log("🚀 ~ file: index.js:66 ~ handleSignup ~ data", data)
      setLoading(true);
      const response = await axiosPrivate.post(
        '/signup',
        JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email, 
          phoneNumber: phoneNumber,
          password: password,
          passwordConfirm: passwordConfirm,
        }),
      );
      console.log('success', JSON.stringify(response.data));
           
      const responseLogin = await axiosPrivate.post(
        '/login',
        JSON.stringify({email: email, password: password}),
      );
      const accessToken = responseLogin?.data?.accessToken;
      setAuth({email: email, accessToken}); 
      console.log('success', JSON.stringify(response.data));
      setLoading(false);
      props.navigation.navigate('AppStackScreen')
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
      console.log("🚀 ~ file: index.js:70 ~ handleSignup ~ error", error)
      console.log(error.response.data);
  };
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.viewIcon} onPress={() => props.navigation.goBack()}>
          <IC_BackwardArrow stroke={color.White} />
        </TouchableOpacity>

        <View style={styles.ViewTitleText}>
          <Text style={styles.textTile}>Welcome!</Text>
          <Text style={styles.textLabel}>Sign in to continue</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.inputName}>
          {/* FirstName */}
          <Controller
            name="firstName"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.inputFirstName}>
                <View style={styles.viewInput}>
                <TextInput
                  onChangeText={firstName => [onChange(firstName), setFirstName(firstName)]}
                  placeholder="First name"
                  value={value}
                  placeholderTextColor={color.GraySolid}
                  style={styles.inputText}
                  keyboardType="default"
                />
                </View>
                {errors?.firstName && (
                  <Text style={styles.textFailed}>{errors.firstName.message}</Text>
                )}
              </View>
            )}
          />
          {/* LastName */}
          <Controller
            name="lastName"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.inputLastName}>
                <View style={styles.viewInput}>
                <TextInput
                  onChangeText={lastName => [onChange(lastName), setLastName(lastName)]}
                  placeholder="Last name"
                  value={value}
                  placeholderTextColor={color.GraySolid}
                  style={styles.inputText}
                  keyboardType="default"
                />
                </View>
                {errors?.lastName && (
                  <Text style={styles.textFailed}>{errors.lastName.message}</Text>
                )}
              </View>
            )}
          />
        </View>
        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={styles.inputMailBox}>
              <View style={styles.viewInput}>
              <TextInput
                onChangeText={email => [onChange(email), setEmail(email)]}
                placeholder="Email"
                value={value}
                placeholderTextColor={color.GraySolid}
                style={styles.inputText}
                keyboardType="default"
              />
              </View>
              {errors?.email && (
                <Text style={styles.textFailed}>{errors.email.message}</Text>
              )}
            </View>
          )}
        />
        {/* Email */}
        <Controller
          name="phoneNumber"
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={styles.inputPhoneNumber}>
              <View style={styles.viewInput}>
              <TextInput
                onChangeText={phoneNumber => [onChange(phoneNumber), setPhoneNumber(phoneNumber)]}
                placeholder="Phone number"
                value={value}
                placeholderTextColor={color.GraySolid}
                style={styles.inputText}
                keyboardType="default"
              />
              </View>
              {errors?.phoneNumber && (
                <Text style={styles.textFailed}>{errors.phoneNumber.message}</Text>
              )}
            </View>
          )}
        />

        {/* passwordInput */}
        <Controller
          name="password"
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={styles.inputPassword}>
              <View style={styles.viewInput}>
              <TextInput
                secureTextEntry={true}
                onChangeText={password =>[ onChange(password),setPassword(password)]}
                value={value}
                placeholder="Password"
                placeholderTextColor={color.GraySolid}
                style={styles.inputText}
              />
              </View>
              {errors?.password && (
                <Text style={styles.textFailed}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />
        {/* passwordInput */}
        <Controller
          name="passwordConfirm"
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={styles.inputPasswordConfirm}>
              <View style={styles.viewInput}>
              <TextInput
                secureTextEntry={true}
                onChangeText={passwordConfirm =>[ onChange(passwordConfirm),setPasswordConfirm(password)]}
                value={value}
                placeholder="Password Confirm"
                placeholderTextColor={color.GraySolid}
                style={styles.inputText}
              />
              </View>
              {errors?.passwordConfirm && (
                <Text style={styles.textFailed}>{errors.passwordConfirm.message}</Text>
              )}
            </View>
          )}
        />

        <View style={styles.buttonSignIn}>
          <SaveButton text={'Sign Up'} onPress={handleSubmit(handleSignup)}
          loading={loading}
          />
        </View>
      </View>
      
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.3,
    backgroundColor: color.TitleActive,
  },
  viewIcon: {
    marginLeft: scale(30),
    width: scale(40),
    height: scale(30),
    marginTop: scale(23),
    alignItems: 'center',
  },
  ViewTitleText: {
    marginTop: scale(10),
    marginLeft: scale(30),
  },
  textTile: {
    color: color.White,
    fontSize: 36,
    fontFamily: FONT_FAMILY.JoseFinSans,
    fontWeight: 700,
  },
  textLabel: {
    color: color.White,
    fontSize: 18,
    fontFamily: FONT_FAMILY.JoseFinSans,
    fontWeight: 500,
  },
  body: {
    flex: 0.7,
    backgroundColor: color.White,
    alignItems: 'center',
  },
  viewInput: {
    width: scale(295),
    height: scale(51),
    borderColor: color.GraySolid,
  },
  inputName: {
    flexDirection: 'row',
    marginTop: scale(10),
    width: scale(295),
    height: scale(51),
    justifyContent: 'space-between',
  },
  inputFirstName: {
    borderBottomWidth: 1,
    width: scale(107),
    height: scale(51),
  },
  inputLastName: {
    borderBottomWidth: 1,
    width: scale(180),
    height: scale(51),
  },
  inputMailBox: {
    marginTop: scale(10),
    width: scale(295),
    height: scale(51),
    borderColor: color.GraySolid,
    borderBottomWidth: 1,
  },
  inputPhoneNumber:{
    marginTop: scale(10),
    width: scale(295),
    height: scale(51),
    borderColor: color.GraySolid,
    borderBottomWidth: 1,
  },
  inputPassword: {
    marginTop: scale(10),
    width: scale(295),
    height: scale(51),
    borderColor: color.GraySolid,
    borderBottomWidth: 1,
  },
  inputPasswordConfirm: {
    marginTop: scale(10),
    width: scale(295),
    height: scale(51),
    borderColor: color.GraySolid,
    borderBottomWidth: 1,
  },
  inputText: {
    color: color.TitleActive,
    fontSize: 16,
    marginTop:scale(10),
    marginLeft: scale(5),
  },
  buttonSignIn: {
    marginTop: scale(61),
  },
  ViewForgotText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(21),
  },
  textForgot: {
    color: color.RedSolid,
    fontSize: 16,
    fontWeight: 400,
    fontFamily: FONT_FAMILY.JoseFinSans,
  },
  textFailed: {
    alignSelf: 'flex-start',
    fontFamily: FONT_FAMILY.JoseFinSans,
    fontSize: scale(12),
    color: color.RedSolid,
    marginTop: scale(5),
  },
});
