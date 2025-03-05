import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import CustomText from './CustomText';
import {  getTailwindClass } from 'store/setting/utils';

interface Day {
  value: number;
  label: string;
  dayNumber: number;
}

interface DayOfWeekProps {
  days: Day[];
  selectedDay: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
}

export const DayOfWeek = ({ days, selectedDay, setSelectedDay }: DayOfWeekProps) => {
  const theme = useSelector((state: RootState) => state.setting.theme); 
  const accent = useSelector((state: RootState) => state.setting.accentColor); 
//   const {} = useTheme()



//   console.log(textHighlight)

  return (
    <View className='mb-4 flex-row items-center justify-between pb-2'>
      {days.map((day) => (
        <TouchableOpacity
          key={day.value}
          onPress={() => setSelectedDay(day.dayNumber)}
          accessibilityLabel={`Select ${day.label}`}
        >
          <View className='items-center'>
            {/* Nome do dia */}
            <CustomText
              variant={selectedDay === day.dayNumber ? 'bold' : 'medium'}
              className={`text-lg ${
                selectedDay === day.dayNumber
                  ? getTailwindClass(accent, "text")
                  : theme === 'dark'
                    ? 'text-textSecondaryDark'
                    : 'text-textSecondaryLight'
              }`}
            >
              {day.label}
            </CustomText>

            {/* Número do dia */}
            <CustomText
              variant={selectedDay === day.dayNumber ? 'bold' : 'medium'}
              className={`text-lg ${
                selectedDay === day.dayNumber
                  ? getTailwindClass(accent, "text")
                  : theme === 'dark'
                    ? 'text-textSecondaryDark'
                    : 'text-textSecondaryLight'
              }`}
            >
              {day.dayNumber}
            </CustomText>

            {/* Indicador do dia selecionado */}
            {selectedDay === day.dayNumber && (
              <View className={`mt-1 h-1 w-1 rounded-full ${getTailwindClass(accent, "bg")}`} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
