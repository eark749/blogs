import { View, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../../src/components/Typography';
import { updatePost, CreatePostData } from '../../../../lib/postsService';
import { usePost } from '../../../../src/hooks/usePost';
import { Feather } from '@expo/vector-icons';
import PostForm from '../../components/PostForm';

export default function EditPost() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { post, loading } = usePost(id ?? '');

  const handleSubmit = async (data: CreatePostData) => {
    await updatePost(id!, data);
    router.replace('/admin');
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.push('/admin')}>
          <Feather name="arrow-left" size={16} color="#3c3b3b" />
        </Pressable>
        <View style={styles.headerText}>
          <Typography variant="displaySm" weight="bold" style={styles.title}>Edit Post</Typography>
          <Typography variant="labelMd" style={styles.subtitle}>Update your blog post</Typography>
        </View>
      </View>
      <View style={styles.divider} />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#aa3621" />
        </View>
      ) : (
        <View style={styles.body}>
          <PostForm
            initialData={post ?? undefined}
            onSubmit={handleSubmit}
            onCancel={() => router.push('/admin')}
            submitLabel="Save Changes"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 40,
    paddingHorizontal: 48,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  },
  backBtn: {
    width: 34, height: 34, borderRadius: 2,
    borderWidth: 1, borderColor: '#e2e2e2',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  headerText: { flex: 1 },
  title: { color: '#000000', marginBottom: 2, fontFamily: 'Newsreader' },
  subtitle: { color: '#c6c6c6' },
  divider: { height: 1, backgroundColor: '#e2e2e2' },
  body: { flex: 1, paddingHorizontal: 48, paddingTop: 32 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
