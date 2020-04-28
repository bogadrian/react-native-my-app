import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';
import BlogCard from '../components/BlogCard';

const BlogScreen = props => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>
        <View style={styles.blogPage}>
          <BlogCard
            text="I learned React Native in 1 month. To be honest, I learned the basics. There are still a lot for me to learn. And I learned building a……"
            title="React Native App"
            url={'https://bogdan.digital/react-native-app/'}
          />
          <BlogCard
            text="I built and put online my first real app! I finished my first real app. I overcome the todo's world! 😀 It feels so good that I was able to…"
            title="“My first real app“"
            url={'https://bogdan.digital/park-your-tir/'}
          />
          <BlogCard
            text="I built My blog with GatsbyJs I just finished building my blog with GatsbyJs. This blog! GatsbyJs is a framework built on top of React. But…"
            title="What I learned from building my blog with Gatsbyjs"
            url={
              'https://bogdan.digital/what-i-learned-from-building-my-blog-with-gatsby/'
            }
          />
          <BlogCard
            text="document.write('Hello World') From a new web developer! My name is Bogdan Adrian and, as many others out there, I am a self-taught developer…"
            title="When I first started"
            url={'https://bogdan.digital/when-i-started/'}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Blog',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Menu"
          iconName={
            Platform.OS === 'android'
              ? 'md-arrow-dropleft-circle'
              : 'ios-arrow-dropleft-circle'
          }
          onPress={() => navData.navigation.navigate('Home')}
        />
      </HeaderButtons>
    ),
    headerRight: props => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Portfolio"
          iconName={Platform.OS === 'android' ? 'md-albums' : 'ios-albums'}
          onPress={() => navData.navigation.push('Portfolio')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  blogPage: { marginVertical: -10 }
});

export default BlogScreen;
