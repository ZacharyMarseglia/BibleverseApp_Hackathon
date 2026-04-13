import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface TimePickerProps {
  hour: number;
  minute: number;
  onChangeHour: (h: number) => void;
  onChangeMinute: (m: number) => void;
}

export const TimePicker = ({ hour, minute, onChangeHour, onChangeMinute }: TimePickerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notification Time</Text>
      <View style={styles.row}>
        <TextInput 
          style={styles.input}
          keyboardType="number-pad"
          maxLength={2}
          value={hour.toString().padStart(2, '0')}
          onChangeText={(val) => {
            const h = parseInt(val, 10);
            if (!isNaN(h) && h >= 0 && h <= 23) onChangeHour(h);
            else if (val === '') onChangeHour(0);
          }}
        />
        <Text style={styles.colon}>:</Text>
        <TextInput 
          style={styles.input}
          keyboardType="number-pad"
          maxLength={2}
          value={minute.toString().padStart(2, '0')}
          onChangeText={(val) => {
            const m = parseInt(val, 10);
            if (!isNaN(m) && m >= 0 && m <= 59) onChangeMinute(m);
            else if (val === '') onChangeMinute(0);
          }}
        />
      </View>
      <Text style={styles.hint}>Format: 24-Hour (00 - 23) for Hours, (00 - 59) for Minutes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 8,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#eaeaea',
    width: 70,
    textAlign: 'center',
  },
  colon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555555',
    marginHorizontal: 10,
  },
  hint: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
    marginLeft: 4,
  }
});
