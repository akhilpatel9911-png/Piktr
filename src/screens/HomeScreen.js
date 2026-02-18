import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RELATIONS = [
  'Mummy',
  'Papa',
  'Friend',
  'bestfriend',
  'bestie',
  'girlfriend',
  'husband',
  'wife',
  'grandfather',
  'grandmother',
  'teacher',
  'sister',
  'brother',
  'fiance',
  'spouse',
  'Self',
];

const AGE_GROUPS = ['0-12', '13-18', '19-25', '26-45', '45+'];

const BUDGETS = ['Rs0-500', 'Rs500-1000', 'Rs1000-2000', 'Rs2000-5000', 'above5000', 'Custom'];

const PRIMARY = '#6366f1';
const BG = '#f5f5f7';

export default function HomeScreen({ navigation }) {
  const [selectedRelation, setSelectedRelation] = useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleFindGifts = () => {
    if (!(selectedRelation && selectedAgeGroup && selectedBudget)) return;

    navigation.navigate('Results', {
      relation: selectedRelation,
      ageGroup: selectedAgeGroup,
      budget: selectedBudget,
    });
  };

  return (
    <LinearGradient
      colors={['#a5b4fc', '#ffffff']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.container}>
        {/* Scrollable content */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appTitle}>Piktr</Text>
            <Text style={styles.subtitle}>Discover premium gifts in a few taps.</Text>
          </View>

          {/* Section 1: Relation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Who is this for?</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relationList}
            >
              {RELATIONS.map((relation) => {
                const selected = selectedRelation === relation;
                return (
                  <TouchableOpacity
                    key={relation}
                    style={[
                      styles.relationItem,
                      selected && styles.relationItemSelected,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedRelation(relation)}
                  >
                    <View
                      style={[
                        styles.relationCircle,
                        selected && styles.relationCircleSelected,
                      ]}
                    />
                    <Text
                      style={[
                        styles.relationLabel,
                        selected && styles.relationLabelSelected,
                      ]}
                    >
                      {relation}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Section 2: Age */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Age group</Text>
            <View style={styles.chipRow}>
              {AGE_GROUPS.map((age) => {
                const selected = selectedAgeGroup === age;
                return (
                  <TouchableOpacity
                    key={age}
                    style={[styles.chip, selected && styles.chipSelected]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedAgeGroup(age)}
                  >
                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                      {age}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Section 3: Budget */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Budget</Text>
            <View style={styles.chipRow}>
              {BUDGETS.map((budget) => {
                const selected = selectedBudget === budget;
                return (
                  <TouchableOpacity
                    key={budget}
                    style={[styles.chip, selected && styles.chipSelected]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedBudget(budget)}
                  >
                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                      {budget}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              !(selectedRelation && selectedAgeGroup && selectedBudget) && styles.primaryButtonDisabled,
            ]}
            activeOpacity={0.9}
            onPress={handleFindGifts}
            disabled={!(selectedRelation && selectedAgeGroup && selectedBudget)}
          >
            <Text style={styles.primaryButtonText}>Find Best Gifts</Text>
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: PRIMARY,
    letterSpacing: 0.8,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },

  // Relation
  relationList: {
    paddingVertical: 4,
  },
  relationItem: {
    alignItems: 'center',
    marginRight: 14,
  },
  relationItemSelected: {
    transform: [{ translateY: -2 }],
  },
  relationCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 6,
  },
  relationCircleSelected: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  relationLabel: {
    fontSize: 12,
    color: '#4b5563',
  },
  relationLabelSelected: {
    color: PRIMARY,
    fontWeight: '600',
  },

  // Chips
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    marginRight: 10,
    marginBottom: 10,
  },
  chipSelected: {
    backgroundColor: PRIMARY,
  },
  chipText: {
    fontSize: 13,
    color: '#374151',
  },
  chipTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },

  // Footer / Button
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: BG,
  },
  primaryButton: {
    backgroundColor: PRIMARY,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonDisabled: {
    backgroundColor: '#a5b4fc',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
