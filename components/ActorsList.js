import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {imagePath} from '../api/publicApi';
import {themeColors} from '../theme';

export default function ActorsList({data}) {
  return (
    <View style={{marginVertical: 24}}>
      <Text
        style={{
          fontSize: 18,
          lineHeight: 28,
          marginBottom: 20,
          marginHorizontal: 16,
          color: themeColors.BG,
        }}>
        Les acteurs
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {data &&
          data.map((person, index) => {
            return (
              <View key={index} style={{alignItems: 'center', marginRight: 16}}>
                <View
                  style={{
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: 9999,
                    height: 80,
                    width: 80,
                    borderWidth: 1,
                    borderColor: 'rgb(115 115 115)',
                  }}>
                  <Image
                    style={{width: 80, borderRadius: 16, height: 96}}
                    source={{
                      uri: imagePath(person?.profile_path, 185),
                    }}
                  />
                </View>

                <Text
                  style={{
                    marginTop: 4,
                    color: 'white',
                    fontSize: 12,
                    lineHeight: 16,
                  }}>
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + '...'
                    : person?.character}
                </Text>
                <Text
                  style={{
                    color: 'rgb(163 163 163)',
                    fontSize: 12,
                    lineHeight: 16,
                  }}>
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + '...'
                    : person?.original_name}
                </Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
