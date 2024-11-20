import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import { Block, theme } from 'galio-framework';
import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

const defaultMenu = [
  { id: 'popular', title: 'Popular' },
  { id: 'beauty', title: 'Beauty' },
  { id: 'cars', title: 'Cars' },
  { id: 'motocycles', title: 'Motocycles' },
];

const MenuHorizontal = ({ data = defaultMenu, initialIndex = null, onChange, ...props }) => {
  const [active, setActive] = useState(null);
  const menuRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (initialIndex !== null && initialIndex >= 0 && initialIndex < data.length) {
      selectMenu(data[initialIndex].id);
    }
  }, [initialIndex, data]);

  const animate = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      // useNativeDriver: true, // Uncomment for performance optimization
    }).start();
  };

  const selectMenu = (id) => {
    setActive(id);
    const index = data.findIndex(item => item.id === id);

    if (menuRef.current) {
      menuRef.current.scrollToIndex({
        index,
        viewPosition: 0.5,
      });
    }

    animate();
    onChange && onChange(id);
  };

  const onScrollToIndexFailed = () => {
    if (menuRef.current) {
      menuRef.current.scrollToIndex({
        index: 0,
        viewPosition: 0.5,
      });
    }
  };

  const renderItem = ({ item }) => {
    const isActive = active === item.id;
    const textColor = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [materialTheme.COLORS.MUTED, isActive ? materialTheme.COLORS.ACTIVE : materialTheme.COLORS.MUTED],
      extrapolate: 'clamp',
    });

    const widthAnim = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', isActive ? '100%' : '0%'],
      extrapolate: 'clamp',
    });

    return (
      <Block style={styles.titleContainer}>
        <Animated.Text
          style={[styles.menuTitle, { color: textColor }]}
          onPress={() => selectMenu(item.id)}
          accessibilityLabel={item.title}
          accessibilityRole="button"
        >
          {item.title}
        </Animated.Text>
        <Animated.View style={{ height: 2, width: widthAnim, backgroundColor: materialTheme.COLORS.ACTIVE }} />
      </Block>
    );
  };

  return (
    <Block style={[styles.container, styles.shadow]}>
      <FlatList
        {...props}
        data={data}
        horizontal
        ref={menuRef}
        extraData={active}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={onScrollToIndexFailed}
        renderItem={renderItem}
        contentContainerStyle={styles.menu}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: theme.COLORS.WHITE,
    zIndex: 2,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  menu: {
    paddingHorizontal: theme.SIZES.BASE * 2.5,
    paddingTop: 8,
    paddingBottom: 0,
  },
  titleContainer: {
    alignItems: 'center',
  },
  menuTitle: {
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 28,
    paddingHorizontal: 16,
    color: materialTheme.COLORS.MUTED,
  },
});

export default MenuHorizontal;
