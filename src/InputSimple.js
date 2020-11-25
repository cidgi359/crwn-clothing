//  src/components/InputSimple

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';
import PropTypes from "prop-types";
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'
import { Avatar } from 'react-native-paper';

import globalStyles from '../styles/GlobalStyles'

import PickerLanguage from '../components/PickerLanguage'
import PickerCountry from '../components/PickerCountry'
import PickerTimezone from '../components/PickerTimezone'

const propTypes = {
    mapElement: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    label: PropTypes.string
};

const defaultProps = {
    mapElement: (n) => {},
    onSubmitEditing: () => {},
    onChangeText: () => {},
    value: "",
    placeholder: "",
    maxLength: 200,
    keyboardType: "default",
    secureTextEntry: false,
    label: ""
};


const styles = StyleSheet.create({
   main_box:{
      marginVertical: 5,
   },
   label_profile:{
      fontSize: 18,
      alignSelf: 'flex-start',
      fontWeight: 'bold',

   },

   input_box: {
      width:300,
      height:40,
      backgroundColor:'rgba(255, 255, 255, 1)',
      borderRadius: 10,
      borderColor: "rgba(3, 96, 121,1)",
      borderWidth: 1,
      paddingHorizontal:16,
      fontSize:16,
      color:'#000',
      marginVertical: 5
   },

   picker_main_box:{
      width:300,
      height:40,
      backgroundColor:'rgba(255, 255, 255, 1)',
      borderRadius: 10,
      borderColor: "rgba(3, 96, 121,1)",
      borderWidth: 1,
      marginVertical: 5,
      justifyContent: 'center'
   },
   picker_box:{
      marginLeft:5,
   },

   date_picker_box:{
      justifyContent:'center',
   },
   date_picker_text:{
      fontSize: 16,
   },

});


function InputSimple (props){

   const [inputValue, setInputValue] = useState(props.inputValue)

   const [isDatePickerVisible, setDatePickerVisible] = useState(false)




   useEffect(() => {
      props.onChangeText(inputValue);

   });



   const showDatePicker = () => {
      setDatePickerVisible(true)
   }
   const hideDatePicker = () => {
      setDatePickerVisible(false)
   }
   const handleConfirm = (datetime) => {
      const date = moment(datetime).format('L');
      setInputValue(date)
      props.onChangeText(date)
      hideDatePicker()
   }


   const _onChangeText = (value) => {
      setInputValue(value)
      props.onChangeText(value);
   }


   function _chooseTypePicker (){
      if (pickerType ===  'language'){
         return(
            <PickerLanguage
               selectedValue={inputValue}
               onChangeText={_onChangeText}
            />
         )
      }
      else if (pickerType ===  'country'){
         return (
            <PickerCountry
               selectedValue={inputValue}
               onChangeText={_onChangeText}
            />
         )
      }
      else if (pickerType ===  'timezone'){
         return(
            <PickerTimezone
               selectedValue={inputValue}
               onChangeText={_onChangeText}
            />
         )
      }
      else {
         return(
            <Picker
                selectedValue={inputValue}
                style={styles.picker_box}
                onValueChange={(itemValue, itemIndex) => setText(itemValue)}
            >
                <Picker.Item label=" " value="null" />
                <Picker.Item label="United Kingdom" value="uk" />
               <Picker.Item label="United State of America" value="usa" />
               <Picker.Item label="France" value="fr" />
            </Picker>
         )
      }
   }




   function _chooseInputOrDatePicker(){
      if (inputType === 'input_datepicker'){
         return (
            <TouchableOpacity
               style={[styles.input_box, styles.date_picker_box]}
               onPress={showDatePicker}
            >
               <Text style={styles.date_picker_text}>{inputValue}</Text>
               <DateTimePicker
                  isVisible={isDatePickerVisible}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  mode="date"
               />
            </TouchableOpacity>
         )
       }
      else if(inputType === 'input_picker'){
         return(
            <View style={styles.picker_main_box}>
               {_chooseTypePicker()}
           </View>
         )
      }
      else {
         return (
            <TextInput
               style={styles.input_box}
               underlineColorAndroid='rgba(0,0,0,0)'
               placeholder={placeholder}
               placeholderTextColor="rgba(255,255,255,0.8)"
               selectionColor="#000"
               secureTextEntry={secureTextEntry}
               keyboardType={keyboardType}
               maxLength={maxLength}
               returnKeyType="next"
               value={inputValue}
               onSubmitEditing={onSubmitEditing}
               onChangeText={_onChangeText}
            />
         )
      }

   }


const {placeholder, secureTextEntry, keyboardType, maxLength, value, onChangeText, onSubmitEditing, inputType, pickerType} = props;
   return(
   	<View style={styles.main_box}>
         <Text style={styles.label_profile}>
         {props.label}
         </Text>
         {_chooseInputOrDatePicker()}
     </View>
   )

}


InputSimple.defaultProps = defaultProps;

InputSimple.propTypes = propTypes;

export default InputSimple
