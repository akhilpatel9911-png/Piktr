import React, { useMemo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { ShoppingCart, Sparkles } from 'lucide-react-native';
import giftsData from '../data/gifts';

const ResultScreen = ({ route, navigation }) => {
  const { relation, budget } = route.params; // Home screen से आया डेटा

  const filteredGifts = useMemo(() => {
    return giftsData.filter(gift => {
      const rel = relation.toLowerCase().trim();
      const giftTags = gift.tags.map(t => t.toLowerCase().trim());

      // 1. Tag Match
      const isMatch = giftTags.includes(rel) || (rel.includes('friend') && giftTags.includes('friend'));

      // 2. Budget Fix (Rs500-1000 जैसी स्ट्रिंग से नंबर निकालना)
      let maxBudget = 100000;
      if (typeof budget === 'string') {
        const nums = budget.match(/\d+/g);
        if (nums) maxBudget = parseInt(nums[nums.length - 1]);
      } else {
        maxBudget = budget;
      }

      return isMatch && gift.price_amazon <= maxBudget;
    });
  }, [relation, budget]);

  const renderGift = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <View style={styles.p15}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>Amazon: ₹{item.price_amazon}</Text>
          <Text style={styles.price}>Flipkart: ₹{item.price_flipkart}</Text>
        </View>
        
        <TouchableOpacity style={styles.buyBtn} onPress={() => Linking.openURL(item.amazon_link)}>
          <ShoppingCart size={18} color="white" />
          <Text style={styles.whiteBtnText}>Buy Now</Text>
        </TouchableOpacity>

        {/* AI Message Button */}
        <TouchableOpacity 
          style={styles.msgBtn} 
          onPress={() => navigation.navigate('CardGenerator', { relation })}
        >
          <Sparkles size={16} color="white" />
          <Text style={styles.whiteBtnText}>Generate AI Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={filteredGifts} 
        renderItem={renderGift} 
        keyExtractor={i => i.id}
        ListHeaderComponent={<Text style={styles.head}>Piktr's Picks for {relation}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>No gifts found for this budget!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 15 },
  head: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 10, color: '#1f2937' },
  card: { backgroundColor: 'white', borderRadius: 15, marginBottom: 20, overflow: 'hidden', elevation: 3 },
  img: { width: '100%', height: 180, backgroundColor: '#eee' },
  p15: { padding: 15 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#374151' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  price: { color: '#6b7280', fontSize: 14 },
  buyBtn: { backgroundColor: '#6366f1', padding: 12, borderRadius: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  msgBtn: { backgroundColor: '#10b981', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center' },
  whiteBtnText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
  empty: { textAlign: 'center', marginTop: 50, color: '#9ca3af' }
});

export default ResultScreen;