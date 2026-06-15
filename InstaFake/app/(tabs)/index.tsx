import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, FlatList, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
 
const STORIES = [
  { id: '0', name: 'Seu story', emoji: '➕', seen: false },
  { id: '1', name: 'ana.rio', emoji: '🌴', seen: false },
  { id: '2', name: 'pedro_m', emoji: '🎵', seen: false },
  { id: '3', name: 'gabizinha', emoji: '🍕', seen: false },
  { id: '4', name: 'surf.rio', emoji: '🏄', seen: false },
  { id: '5', name: 'cafezin', emoji: '☕', seen: true },
];
 
const POSTS = [
  { 
    id: '1', 
    user: 'ana.rio', 
    location: 'Ipanema, Rio de Janeiro', 
    imageUri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', // Foto de praia
    likes: 1284, 
    caption: 'Que pôr do sol no Arpoador hoje 😍🌊', 
    time: '2 horas atrás', 
    liked: false 
  },
  { 
    id: '2', 
    user: 'pedro_m', 
    location: 'Lapa, Rio de Janeiro', 
    imageUri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600', // Foto de show
    likes: 892, 
    caption: 'Show incrível na Lapa ontem à noite 🎶🔥', 
    time: '5 horas atrás', 
    liked: true 
  },
  { 
    id: '3', 
    user: 'gabizinha', 
    location: 'Santa Teresa, RJ', 
    imageUri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600', // Foto de pizza
    likes: 3102, 
    caption: 'Pizza de churrasquinho da Gabi ❤️ receita em breve!', 
    time: '8 horas atrás', 
    liked: false 
  },
];
 
function StoriesBar() {
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      style={styles.storiesBar} contentContainerStyle={{ paddingHorizontal: 12, gap: 14 }}>
      {STORIES.map(story => (
        <TouchableOpacity key={story.id} style={styles.storyItem}
          onPress={() => setSeen(prev => ({ ...prev, [story.id]: true }))}>
          <View style={[styles.storyRing, (seen[story.id] || story.seen) && styles.storyRingSeen]}>
            <View style={styles.storyInner}>
              <Text style={{ fontSize: 28 }}>{story.emoji}</Text>
            </View>
          </View>
          <Text style={styles.storyName} numberOfLines={1}>{story.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
 
function Post({ post }: { post: typeof POSTS[0] }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
 
  function toggleLike() {
    setLiked(prev => { setLikeCount(c => prev ? c - 1 : c + 1); return !prev; });
  }
 
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.postUser}>
          <View style={styles.postAvatar}>
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '700' }}>{post.user[0].toUpperCase()}</Text>
          </View>
          <View>
            <Text style={styles.postUsername}>{post.user}</Text>
            <Text style={styles.postLocation}>{post.location}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 22, color: '#262626' }}>···</Text>
      </View>
      <View style={styles.postImage}>
        <Image 
          source={{ uri: post.imageUri }} 
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }} 
        />
      </View>
      <View style={styles.postActions}>
        <TouchableOpacity onPress={toggleLike}>
          <Text style={[styles.actionIcon, liked && { color: '#ed4956' }]}>{liked ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <TouchableOpacity><Text style={styles.actionIcon}>💬</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.actionIcon}>📤</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setSaved(s => !s)} style={{ marginLeft: 'auto' }}>
          <Text style={styles.actionIcon}>{saved ? '🔖' : '🏷️'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.postLikes}>{likeCount.toLocaleString('pt-BR')} curtidas</Text>
      <Text style={styles.postCaption}><Text style={{ fontWeight: '700' }}>{post.user} </Text>{post.caption}</Text>
      <Text style={styles.postTime}>{post.time}</Text>
    </View>
  );
}
 
export default function FeedScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <TouchableOpacity onPress={() => router.push('/dms')}>
          <Text style={{ fontSize: 24 }}>✉️</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={POSTS}
        keyExtractor={item => item.id}
        ListHeaderComponent={<StoriesBar />}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb' },
  logo: { fontSize: 24, fontStyle: 'italic', fontWeight: '700', fontFamily: 'serif', color: '#262626' },
  storiesBar: { backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb', paddingVertical: 10 },
  storyItem: { alignItems: 'center', gap: 4, width: 68 },
  storyRing: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#bc1888', alignItems: 'center', justifyContent: 'center' },
  storyRingSeen: { borderColor: '#dbdbdb' },
  storyInner: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  storyName: { fontSize: 11, color: '#262626', textAlign: 'center' },
  post: { backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb', marginBottom: 2 },
  postHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12 },
  postUser: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  postAvatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#bc1888', alignItems: 'center', justifyContent: 'center' },
  postUsername: { fontSize: 13, fontWeight: '700', color: '#262626' },
  postLocation: { fontSize: 11, color: '#8e8e8e' },
  postImage: { width: '100%', aspectRatio: 1, backgroundColor: '#efefef', alignItems: 'center', justifyContent: 'center' },
  postActions: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, gap: 14 },
  actionIcon: { fontSize: 24 },
  postLikes: { paddingHorizontal: 12, fontSize: 13, fontWeight: '700', color: '#262626', marginBottom: 4 },
  postCaption: { paddingHorizontal: 12, fontSize: 13, color: '#262626', lineHeight: 18, marginBottom: 4 },
  postTime: { paddingHorizontal: 12, fontSize: 10, color: '#8e8e8e', marginBottom: 10, textTransform: 'uppercase' },
});