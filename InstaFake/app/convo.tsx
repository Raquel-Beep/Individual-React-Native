import { useState, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type Message = { id: string; text: string; mine: boolean };

const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: 'Oi! Que foto incrível!! 😍', mine: false },
  { id: '2', text: 'Obrigada!! O céu estava demais hoje', mine: true },
  { id: '3', text: 'Eu precisava ter ido! 😭', mine: false },
  { id: '4', text: 'Amanhã vai ter de novo, aparece! 🌅', mine: true },
  { id: '5', text: 'Com certeza!! A que horas?', mine: false },
];

const AUTO_REPLIES = ['😍', 'Que legal!', 'Adorei!', 'Boa demais!', 'Sério?? 😂', '👏👏'];

export default function ConvoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const convo = typeof params.convo === 'string' ? JSON.parse(params.convo) : params;

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const listRef = useRef<FlatList>(null);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const myMsg: Message = { id: Date.now().toString(), text, mine: true };
    setMessages(prev => [...prev, myMsg]);
    setInput('');

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        mine: false,
      };
      setMessages(prev => [...prev, reply]);
    }, 900);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 4 }}>
            <Text style={{ fontSize: 28, color: '#262626' }}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerAvatar}>
            <Text style={{ fontSize: 20 }}>{convo.emoji || '💬'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerName}>{convo.name || 'Usuário'}</Text>
            <Text style={[styles.headerStatus, { color: convo.online ? '#2ecc71' : '#8e8e8e' }]}>
              {convo.online ? 'Ativo agora' : `Ativo há ${convo.time || 'algum tempo'}`}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 18 }}>
            <Text style={{ fontSize: 22 }}>📞</Text>
            <Text style={{ fontSize: 22 }}>📹</Text>
          </View>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 12, gap: 6 }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View style={[styles.bubbleWrap, item.mine && styles.bubbleWrapMine]}>
              <View style={[styles.bubble, item.mine ? styles.bubbleMine : styles.bubbleThem]}>
                <Text style={[styles.bubbleText, item.mine && { color: '#fff' }]}>
                  {item.text}
                </Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputBar}>
          <Text style={{ fontSize: 24 }}>😊</Text>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Mensagem..."
            placeholderTextColor="#8e8e8e"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={sendMessage}>
            <Text style={[styles.sendBtn, input.trim() ? { color: '#0095f6' } : { color: '#8e8e8e' }]}>
              Enviar
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb',
  },
  headerAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#fafafa', borderWidth: 0.5, borderColor: '#dbdbdb',
    alignItems: 'center', justifyContent: 'center',
  },
  headerName: { fontSize: 14, fontWeight: '700', color: '#262626' },
  headerStatus: { fontSize: 12 },
  bubbleWrap: { flexDirection: 'row' },
  bubbleWrapMine: { justifyContent: 'flex-end' },
  bubble: {
    maxWidth: '72%', paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 20,
  },
  bubbleMine: {
    backgroundColor: '#0095f6',
    borderBottomRightRadius: 4,
  },
  bubbleThem: {
    backgroundColor: '#efefef',
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 14, color: '#262626', lineHeight: 20 },
  inputBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 8,
    borderTopWidth: 0.5, borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1, borderWidth: 0.5, borderColor: '#dbdbdb', borderRadius: 22,
    paddingHorizontal: 14, paddingVertical: 9, fontSize: 14, color: '#262626',
    backgroundColor: '#fafafa',
  },
  sendBtn: { fontSize: 14, fontWeight: '700' },
});