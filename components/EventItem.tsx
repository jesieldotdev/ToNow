import useStore from 'hooks/useStore';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { getTailwindClass } from 'store/setting/utils';

import CustomText from './CustomText';

interface EventProps {
  time: Time;
  title: string;
  description?: string;
  isHighlighted?: boolean;
  participants?: string[];
}

const EventItem: React.FC<EventProps> = ({
  time,
  title,
  description,
  isHighlighted,
  participants,
}) => {
  const [, , select] = useStore();
  const theme = select('setting.theme');
  const accent = select('setting.accentColor');

  const displayedDescription = description && description.trim().length > 0 ? description : title;

  return (
    <Animated.View
      entering={FadeInUp.duration(500).springify()}
      className='relative mb-6 flex-row items-center'
    >
      {/* Indicador de Evento */}
      <View
        className={`border-2 ${theme === 'dark' ? 'bg-bgDark' : 'bg-bgLight'} ${
          isHighlighted ? '-left-[25px] h-8 w-8' : '-left-[20px] h-5 w-5'
        } absolute top-0 flex items-center justify-center rounded-full ${getTailwindClass(
          accent,
          'border'
        )} `}
      >
        {isHighlighted && (
          <View className={`h-5 w-5 ${getTailwindClass(accent, 'bg')} rounded-full`} />
        )}
      </View>

      {/* Container Principal */}
      <View
        className={`ml-6 flex-1 rounded-xl p-5 drop-shadow-lg ${
          isHighlighted
            ? getTailwindClass(accent, 'bg')
            : theme === 'dark'
              ? 'bg-cardDark'
              : 'bg-cardLight'
        } `}
      >
        <View className='flex flex-row justify-between'>
          {description ? (
            <CustomText
              variant='bold'
              className={`text-xl ${
                isHighlighted
                  ? 'text-white'
                  : theme === 'dark'
                    ? 'text-textPrimaryDark'
                    : 'text-textPrimaryLight'
              }`}
            >
              {title}
            </CustomText>
          ) : null}
          <CustomText
            variant='semiBold'
            className={`mb-1 text-sm ${
              isHighlighted
                ? 'text-white'
                : theme === 'dark'
                  ? 'text-textSecondaryDark'
                  : 'text-textSecondaryLight'
            }`}
          >
            {time.hour}
          </CustomText>
        </View>

        <CustomText
          variant='regular'
          className={`mt-1 text-base ${
            isHighlighted
              ? 'text-white'
              : theme === 'dark'
                ? 'text-textSecondaryDark'
                : 'text-textSecondaryLight'
          }`}
        >
          {displayedDescription}
        </CustomText>

        {/* Lista de Participantes */}
        {participants?.length ? (
          <View className='mt-2 flex flex-row gap-1'>
            {participants.map((item, index) => (
              <View key={index} className='rounded-full bg-bgLight p-0.5 dark:bg-bgDark'>
                <Image source={{ uri: item }} className='h-8 w-8 rounded-full' resizeMode='cover' />
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
};

export default EventItem;
