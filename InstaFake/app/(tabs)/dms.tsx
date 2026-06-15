import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router'; 

const CONVERSATIONS = [
  { id: '1', name: 'ana.rio', emoji: '🌴', preview: 'Oi! Que foto incrível!!', time: '2min', online: true, unread: true },
  { id: '2', name: 'pedro_m', emoji: '🎵', preview: 'Valeu cara! Foi demais!', time: '15min', online: false, unread: false },
  { id: '3', name: 'gabizinha', emoji: '🍕', preview: 'Adorei!! Manda a receita 😋', time: '1h', online: false, unread: false },
  { id: '4', name: 'surf.rio', emoji: '🏄', preview: 'Amanhã tem ondas!', time: '3h', online: true, unread: true },
  { id: '5', name: 'cafezin', emoji: '☕', preview: 'Chegou o grão novo! ☕', time: 'ontem', online: false, unread: false },
];

export default function DMListScreen() {

  const router = useRouter(); 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>você</Text>
        <Text style={{ fontSize: 24 }}>✏️</Text>
      </View>

      <Text style={styles.sectionLabel}>Mensagens</Text>

      <FlatList
        data={CONVERSATIONS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dmItem}
            onPress={() => router.push({
              pathname: '/convo', 
              params: { convo: JSON.stringify(item) }
            })}
          >
            <View style={styles.avatarWrap}>
              <View style={styles.dmAvatar}>
                <Text style={{ fontSize: 26 }}>{item.emoji}</Text>
              </View>
              {item.online && <View style={styles.onlineDot} />}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.dmName}>{item.name}</Text>
              <Text
                style={[styles.dmPreview, item.unread && styles.dmPreviewUnread]}
                numberOfLines={1}
              >
                {item.preview}
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end', gap: 4 }}>
              <Text style={styles.dmTime}>{item.time}</Text>
              {item.unread && <View style={styles.unreadDot} />}
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#262626' },
  sectionLabel: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 12, fontWeight: '600', color: '#8e8e8e' },
  dmItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 12 },
  avatarWrap: { position: 'relative' },
  dmAvatar: {
    width: 54, height: 54, borderRadius: 27,
    backgroundColor: '#fafafa', borderWidth: 0.5, borderColor: '#dbdbdb',
    alignItems: 'center', justifyContent: 'center',
  },
  onlineDot: {
    position: 'absolute', bottom: 2, right: 2,
    width: 13, height: 13, borderRadius: 7,
    backgroundColor: '#2ecc71', borderWidth: 2, borderColor: '#fff',
  },
  dmName: { fontSize: 14, fontWeight: '600', color: '#262626', marginBottom: 2 },
  dmPreview: { fontSize: 13, color: '#8e8e8e' },
  dmPreviewUnread: { color: '#262626', fontWeight: '600' },
  dmTime: { fontSize: 11, color: '#8e8e8e' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#0095f6' },
});