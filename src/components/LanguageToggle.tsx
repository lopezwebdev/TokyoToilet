import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Expo vector icons
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLanguageSelect = (lang: 'en' | 'ja') => {
    setLanguage(lang);
    setIsExpanded(false);
  };

  return (
    <View style={styles.container}>
      {!isExpanded ? (
        <TouchableOpacity
          onPress={handleToggleExpand}
          style={styles.toggleButton}
        >
          <Ionicons name="language-outline" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <View style={styles.expandedContainer}>
          <TouchableOpacity
            onPress={handleToggleExpand}
            style={styles.smallButton}
          >
            <Ionicons name="language-outline" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLanguageSelect('en')}
            style={[
              styles.langButton,
              language === 'en' && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.langText,
                language === 'en' && styles.selectedText,
              ]}
            >
              EN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLanguageSelect('ja')}
            style={[
              styles.langButton,
              language === 'ja' && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.langText,
                language === 'ja' && styles.selectedText,
              ]}
            >
              日本語
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
  },
  toggleButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 4,
  },
  smallButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: 'white',
  },
  langText: {
    fontSize: 14,
    color: 'white',
  },
  selectedText: {
    color: '#1a1a1a',
    fontWeight: '600',
  },
});
