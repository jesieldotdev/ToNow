import { AntDesign } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
import useStore from 'hooks/useStore';
import { p } from 'hooks/useTranslationHelper';
import { t } from 'i18next';
import { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
  Pressable,
  Easing,
  ScrollView,
  Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';
import { getTailwindClass } from 'store/setting/utils';

import CustomText from './CustomText';
import DatePickerModal from './DatePicker';
import CustomTimePicker from './TimePicker';
import en from '../locales/en.json';

const { height: screenHeight } = Dimensions.get('window');

const CreateEvent = () => {
  const [, actions, select] = useStore();
  const {
    task: { addTaskItem, setTask }
  } = actions;

  const theme = select('setting.theme');
  const accent = select('setting.accentColor');
  const visible = select('task.taskModalTable');
  const setIsOpen = () => setTask('taskModalTable', !visible);

  const handleAddTodo = (task: TaskItem) => {
    addTaskItem(task);
  };

  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [isVisible, setIsVisible] = useState(visible);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      translateY.setValue(screenHeight);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true
      }).start(() => setIsVisible(false));
    }
  }, [visible]);

  const handleAddEvent = () => {
    if (title.trim().length > 0) {
      handleAddTodo({
        title,
        description,
        time: {
          hour: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: {
            day: {
              label: date.toLocaleDateString('en-US', { weekday: 'short' }),
              value: date.getDate()
            },
            month: {
              label: date.toLocaleDateString('en-US', { month: 'short' }),
              value: date.getMonth() + 1
            },
            year: date.getFullYear(),
            dayWeek: {
              value: date.getDay(),
              label: date.toLocaleDateString('en-US', { weekday: 'short' })
            }
          }
        },
        participants: []
      });

      setTitle('');
      setDescription('');
      setDate(new Date());
      setTime(new Date());

      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true
      }).start(() => setIsOpen());
    }
  };

  useEffect(() => {
    // Comentado para evitar warnings
    // NavigationBar.setBackgroundColorAsync(theme === 'dark' ? '#282828' : '#fff');
    // NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  return (
    <Modal transparent visible={isVisible} animationType='fade' statusBarTranslucent>
      <View className='flex-1'>
        <Animated.View
          style={{ 
            transform: [{ translateY }],
            height: screenHeight,
            width: '100%'
          }}
          className={`${theme === 'dark' ? 'bg-bgDark' : 'bg-bgLight'}`}
        >
          {/* Header com botão de fechar */}
          <View className={`flex-row items-center justify-between p-6 pt-12 ${theme === 'dark' ? 'border-b border-gray-600' : 'border-b border-gray-300'}`}>
            <TouchableOpacity onPress={setIsOpen}>
              <AntDesign 
                name="close" 
                size={24} 
                color={theme === 'dark' ? '#fff' : '#000'} 
              />
            </TouchableOpacity>
            
            <CustomText
              variant='bold'
              className={`text-xl ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
            >
              {p('addNewTask')}
            </CustomText>
            
            {/* Espaço vazio para centralizar o título */}
            <View style={{ width: 24 }} />
          </View>

          {/* Conteúdo scrollável */}
          <ScrollView className='flex-1 p-6' showsVerticalScrollIndicator={false}>
            <View className='mb-4'>
              <TextInput
                className={`rounded-lg border p-3 text-lg ${theme === 'dark' ? 'border-gray-600 bg-cardDark text-textPrimaryDark' : 'border-gray-300 bg-cardLight text-textPrimaryLight'} `}
                placeholder={p('titlePlaceholder')}
                placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View className='mb-4'>
              <TextInput
                className={`rounded-lg border p-3 text-lg ${theme === 'dark' ? 'border-gray-600 bg-cardDark text-textPrimaryDark' : 'border-gray-300 bg-cardLight text-textPrimaryLight'} `}
                placeholder={p('descriptionPlaceholder')}
                placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Campo de Seleção de Data */}
            <View className='mb-4'>
              <CustomText
                variant='semiBold'
                className={`${theme === 'dark' ? 'text-textPrimaryDark' : 'text-gray-700'} mb-2`}
              >
                {p('date')}
              </CustomText>
              <TouchableOpacity
                className={`rounded-lg border p-3 ${theme === 'dark' ? 'border-gray-600 bg-cardDark' : 'border-textSecondaryLight'}`}
                onPress={() => setShowDatePicker(true)}
              >
                <CustomText
                  className={theme === 'dark' ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}
                  variant='regular'
                >
                  {date.toDateString()}
                </CustomText>
              </TouchableOpacity>
            </View>

            {/* Campo de Seleção de Hora */}
            <View className='mb-4'>
              <CustomText
                variant='semiBold'
                className={`${theme === 'dark' ? 'text-textPrimaryDark' : 'text-gray-700'} mb-2`}
              >
                {p('time')}
              </CustomText>
              <TouchableOpacity
                className={`rounded-lg border p-3 ${theme === 'dark' ? 'border-gray-600 bg-cardDark' : 'border-textSecondaryLight'}`}
                onPress={() => setShowTimePicker(true)}
              >
                <CustomText className={theme === 'dark' ? 'text-[#9CA3AF]' : 'text-[#6B7280]'} variant='regular'>
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </CustomText>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Footer fixo com o botão */}
          <View className={`p-6 ${theme === 'dark' ? 'border-t border-gray-600' : 'border-t border-gray-300'}`}>
            <TouchableOpacity
              className={`flex flex-row items-center justify-center gap-2 rounded-lg p-4 shadow-md active:opacity-80 ${getTailwindClass(accent, 'bg')}`}
              onPress={handleAddEvent}
            >
              <AntDesign name='plus' size={20} color='white' />
              <CustomText variant='bold' className='text-lg text-white'>
                {p('addTask')}
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* Componentes de Modais Separados */}
          <DatePickerModal
            visible={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            selectedDate={date}
            onDateSelect={setDate}
            theme={theme}
          />
          {showTimePicker && (
            <CustomTimePicker
              visible={showTimePicker}
              onClose={() => setShowTimePicker(false)}
              selectedTime={time}
              onTimeSelect={setTime}
            />
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CreateEvent;