import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

export const CinemaXPlayer = ({ streamUrl }) => {
  const [timestamp, setTimestamp] = useState(0);
  const danmu = [{ time: 2, text: "Ganda ng stream!" }, { time: 5, text: "Safe movie, no OHO scams here." }];

  return (
    <View style={styles.container}>
      <Video 
        source={{ uri: streamUrl }} 
        style={styles.player} 
        onProgress={({currentTime}) => setTimestamp(Math.floor(currentTime))}
        controls={true}
      />
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {danmu.filter(d => d.time === timestamp).map((d, i) => (
          <Text key={i} style={styles.danmuText}>{d.text}</Text>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  player: { width: '100%', height: 250 },
  danmuText: { position: 'absolute', top: 30, color: '#00FF00', fontWeight: 'bold' }
});
