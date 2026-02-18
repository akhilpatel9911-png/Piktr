import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, ScrollView } from 'react-native';
import { Sparkles, Share2, RefreshCw } from 'lucide-react-native';

const CardGeneratorScreen = ({ route }) => {
  const { relation } = route.params;
  const [message, setMessage] = useState('');

  // Ye hai aapka "Offline AI" - Isme humne dher saare options daal diye hain
  const MESSAGE_BANK = {
    mummy: [
      "Mummy, aapke liye chhota sa tohfa! ❤️ Aapki smile hi meri sabse badi khushi hai.",
      "Duniya ki best Maa ke liye, jo hamesha mera khayal rakhti hain. Love you!",
      "Mummy, aap mere liye bhagwan ka roop ho. Ye chhota sa gift aapke liye.",
      "Aapki arthritis ki takleef kam ho aur aap hamesha hasti rahein, yahi dua hai. ❤️",
      "Mummy, aapne mere liye itna kuch kiya, ye gift toh bas ek shuruat hai!"
    ],
    papa: [
      "Papa, aap mere asli hero ho! Hamesha mera saath dene ke liye shukriya.",
      "Aapki mehnat aur pyaar ne hi mujhe yahan tak pahunchaya hai. Love you Papa!",
      "Mere guide, mere dost aur mere sabse bade support system ko—Papa!",
      "Papa, ye gift aapki har us qurbani ke liye jo aapne hamare liye ki.",
      "Duniya ke sabse mahan Pita ko ek pyara sa surprise!"
    ],
    friend: [
      "Bhai, ye gift rakh le aur party ready rakhna! 😂",
      "Dosti mein no sorry, no thank you... bas gift chalta hai!",
      "Ek tu hi toh hai jo meri har bevkufi mein saath deta hai. Thanks bhai!",
      "Zindagi mein sab mile na mile, tere jaisa kamina dost zaroor chahiye!",
      "Gift dekh kar rona mat, agla wala tu hi de raha hai! 😉"
    ],
    bestfriend: [
      "Best friend ke liye best gift! ❤️ Tu dost nahi, mera bhai hai.",
      "Hamari dosti hamesha aise hi bani rahe. Cheers to us!",
      "Tere bina life boring hoti, ye gift hamari pagalpanti ke naam!",
      "Duniya ki har khushi tere kadmon mein ho (aur party mere naseeb mein)!"
    ],
    fiancé: [
      "Hamari nayi shuruat ke naam ek chhota sa tohfa! ❤️ Intezar hai hamari shaadi ka.",
      "Aap meri life ka sabse khoobsurat hissa ho. I love you!",
      "Hamare sapnon ke ghar ki pehli nishani. ❤️",
      "Mere hone wale jeevansathi ko, ye chhota sa pyaar ka izhaar."
    ],
    billu: [
      "Hamare ghar ke asli Don 'Billu' ke liye! 🐾 Myaun Myaun!",
      "Billu, ab sofe ko kharochna band karo aur is gift se khelo!",
      "Duniya ke sabse cute aur naughty cat ko hamara pyaar.",
      "Billu, tum hamari jaan ho! 🐈"
    ],
    pet: [
      "Hamare pyare pet ke liye, jo hamari zindagi mein khushiyan bharta hai! 🐾",
      "Tumhari masumiyat hi hamara sukoon hai. Enjoy your gift!",
      "Wo poonchh hilana aur wo pyaar... sabke liye shukriya!"
    ],
    teacher: [
      "Sikshak wahi hai jo rasta dikhaye. Thank you, Teacher! 🙏",
      "To my mentor and guide, a small token of respect and gratitude.",
      "Aapne hamesha sahi raah dikhayi, shukriya sir/ma'am."
    ],
    default: [
      "A special gift for a special person! 🎁 Kyunki aap sach mein special hain.",
      "Umeed hai ye tohfa aapke chehre par muskan layega!",
      "Piktr ki taraf se aapke liye ek pyara sa surprise!"
    ]
  };

  const generateNewMessage = () => {
    const relKey = relation.toLowerCase().trim();
    // Agar relation match nahi hota toh 'default' choose karega
    const list = MESSAGE_BANK[relKey] || MESSAGE_BANK.default;
    const randomMsg = list[Math.floor(Math.random() * list.length)];
    setMessage(randomMsg);
  };

  useEffect(() => {
    generateNewMessage();
  }, [relation]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Sparkles size={40} color="#6366f1" />
        <Text style={styles.label}>Piktr Smart Message for {relation}:</Text>
        <ScrollView contentContainerStyle={styles.msgBox}>
          <Text style={styles.msg}>"{message}"</Text>
        </ScrollView>
      </View>
      
      <TouchableOpacity style={styles.btn} onPress={generateNewMessage}>
        <RefreshCw size={20} color="white" />
        <Text style={styles.white}>Generate New Magic</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.shareBtn} onPress={() => Share.share({ message })}>
        <Share2 size={20} color="#6366f1" />
        <Text style={styles.shareText}>Share via WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#f3f4f6' },
  card: { backgroundColor: 'white', padding: 30, borderRadius: 30, alignItems: 'center', elevation: 10, marginBottom: 30, minHeight: 250 },
  label: { color: '#9ca3af', marginBottom: 15, fontSize: 14, fontWeight: '600' },
  msgBox: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  msg: { fontSize: 20, textAlign: 'center', fontStyle: 'italic', color: '#1f2937', fontWeight: '500', lineHeight: 28 },
  btn: { backgroundColor: '#6366f1', padding: 18, borderRadius: 15, alignItems: 'center', marginBottom: 20, flexDirection: 'row', justifyContent: 'center' },
  white: { color: 'white', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
  shareBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 },
  shareText: { color: '#6366f1', textAlign: 'center', fontWeight: 'bold', marginLeft: 10, fontSize: 16 }
});

export default CardGeneratorScreen;