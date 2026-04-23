import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { Typography } from '../../src/components/Typography';
import { Post, fetchAllPosts, deletePost } from '../../lib/postsService';
import { supabase } from '../../lib/supabase';
import { Feather } from '@expo/vector-icons';

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try { setPosts(await fetchAllPosts()); }
    catch (err: any) { alert('Failed to load posts: ' + err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const handleDelete = (post: Post) => {
    if (typeof window !== 'undefined') {
      if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) performDelete(post.id);
    } else {
      Alert.alert('Delete Post', `Delete "${post.title}"?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => performDelete(post.id) },
      ]);
    }
  };

  const performDelete = async (id: string) => {
    setDeletingId(id);
    try { await deletePost(id); setPosts(prev => prev.filter(p => p.id !== id)); }
    catch (err: any) { alert('Delete failed: ' + err.message); }
    finally { setDeletingId(null); }
  };

  const published = posts.filter(p => p.is_published);
  const drafts = posts.filter(p => !p.is_published);

  return (
    <View style={styles.root}>
      {/* ── Sidebar ── */}
      <View style={styles.sidebar}>
        <View style={styles.brandRow}>
          <View style={styles.brandDash} />
          <Typography variant="labelMd" style={styles.brandText}>Admin</Typography>
        </View>

        <View style={styles.nav}>
          <View style={[styles.navItem, styles.navActive]}>
            <Feather name="file-text" size={15} color="#aa3621" />
            <Typography variant="labelMd" style={styles.navLabelActive}>Posts</Typography>
          </View>
        </View>

        <View style={styles.sidebarFooter}>
          <Pressable style={styles.footerLink} onPress={() => router.push('/')}>
            <Feather name="arrow-left" size={13} color="#c6c6c6" />
            <Typography variant="labelMd" style={styles.footerLinkText}>Visit Blog</Typography>
          </Pressable>
          <Pressable style={styles.footerLink} onPress={() => supabase.auth.signOut()}>
            <Feather name="log-out" size={13} color="#c6c6c6" />
            <Typography variant="labelMd" style={styles.footerLinkText}>Sign Out</Typography>
          </Pressable>
        </View>
      </View>

      {/* ── Content ── */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Typography variant="displaySm" weight="bold" style={styles.pageTitle}>All Posts</Typography>
            <Typography variant="labelMd" style={styles.pageMeta}>
              {posts.length} total &nbsp;·&nbsp; {published.length} published &nbsp;·&nbsp; {drafts.length} drafts
            </Typography>
          </View>
          <Pressable
            style={({ pressed }) => [styles.newBtn, pressed && styles.newBtnHover]}
            onPress={() => router.push('/admin/posts/new')}
            nativeID="new-post-btn"
          >
            <Feather name="plus" size={14} color="#ffffff" />
            <Typography variant="labelMd" style={styles.newBtnText}>New Post</Typography>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Total Posts', value: posts.length },
            { label: 'Published', value: published.length },
            { label: 'Drafts', value: drafts.length },
          ].map(s => (
            <View key={s.label} style={styles.statBox}>
              <Typography variant="displaySm" weight="bold" style={styles.statNum}>{s.value}</Typography>
              <Typography variant="labelMd" style={styles.statLabel}>{s.label}</Typography>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        {/* List */}
        <ScrollView style={styles.list} contentContainerStyle={styles.listInner} showsVerticalScrollIndicator={false}>
          {loading && (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#aa3621" />
            </View>
          )}

          {!loading && posts.length === 0 && (
            <View style={styles.empty}>
              <Typography variant="headlineLg" style={styles.emptyTitle}>No posts yet.</Typography>
              <Typography variant="bodyLg" style={styles.emptyBody}>
                Create your first post to get started.
              </Typography>
            </View>
          )}

          {posts.map(post => (
            <View key={post.id} style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={styles.rowTopLine}>
                  <View style={[styles.statusDot, post.is_published ? styles.dotPublished : styles.dotDraft]} />
                  <Typography variant="labelMd" style={styles.rowCategory}>
                    {post.category}
                  </Typography>
                  <Typography variant="labelMd" style={styles.rowDate}>
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </Typography>
                </View>
                <Typography variant="headlineLg" weight="bold" style={styles.rowTitle} numberOfLines={1}>
                  {post.title} —
                </Typography>
                <Typography variant="labelMd" style={styles.rowExcerpt} numberOfLines={2}>
                  {post.excerpt}
                </Typography>
              </View>

              <View style={styles.rowActions}>
                <Pressable
                  style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnHover]}
                  onPress={() => router.push(`/admin/posts/${post.id}/edit`)}
                  nativeID={`edit-${post.id}`}
                >
                  <Typography variant="labelMd" style={styles.actionBtnText}>Edit</Typography>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [styles.actionBtn, styles.deleteBtn, pressed && styles.deleteBtnHover]}
                  onPress={() => handleDelete(post)}
                  disabled={deletingId === post.id}
                  nativeID={`delete-${post.id}`}
                >
                  {deletingId === post.id
                    ? <ActivityIndicator size="small" color="#aa3621" />
                    : <Typography variant="labelMd" style={styles.deleteBtnText}>Delete</Typography>
                  }
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row', backgroundColor: '#f9f9f9' },

  /* Sidebar */
  sidebar: {
    width: 200,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e2e2e2',
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 40 },
  brandDash: { width: 20, height: 1, backgroundColor: '#aa3621' },
  brandText: { color: '#aa3621', letterSpacing: 3, textTransform: 'uppercase', fontSize: 10, fontWeight: '700' },
  nav: { flex: 1 },
  navItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 2, marginBottom: 2 },
  navActive: { backgroundColor: '#f3f3f3' },
  navLabel: { color: '#c6c6c6' },
  navLabelActive: { color: '#aa3621' },
  sidebarFooter: { gap: 2 },
  footerLink: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 9, paddingHorizontal: 10 },
  footerLinkText: { color: '#c6c6c6' },

  /* Content */
  content: { flex: 1, paddingTop: 48, paddingHorizontal: 48, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  pageTitle: { color: '#000000', marginBottom: 4, fontFamily: 'Newsreader' },
  pageMeta: { color: '#c6c6c6' },
  newBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: '#000000', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 2,
  },
  newBtnHover: { backgroundColor: '#aa3621' },
  newBtnText: { color: '#ffffff', letterSpacing: 0.5 },
  divider: { height: 1, backgroundColor: '#e2e2e2', marginBottom: 24 },

  /* Stats */
  statsRow: { flexDirection: 'row', gap: 0, marginBottom: 24 },
  statBox: { flex: 1, paddingRight: 24, borderRightWidth: 1, borderRightColor: '#e2e2e2', marginRight: 24, lastChild: { borderRightWidth: 0 } } as any,
  statNum: { color: '#000000', fontSize: 40, marginBottom: 2, fontFamily: 'Newsreader' },
  statLabel: { color: '#c6c6c6' },

  /* List */
  list: { flex: 1 },
  listInner: { gap: 0, paddingBottom: 40 },
  centered: { padding: 60, alignItems: 'center' },
  empty: { paddingVertical: 60, gap: 12 },
  emptyTitle: { color: '#000' },
  emptyBody: { color: '#c6c6c6' },

  /* Post row */
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  },
  rowLeft: { flex: 1, paddingRight: 24 },
  rowTopLine: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  dotPublished: { backgroundColor: '#000000' },
  dotDraft: { backgroundColor: '#c6c6c6' },
  rowCategory: { color: '#c6c6c6', textTransform: 'uppercase', letterSpacing: 1, fontSize: 11 },
  rowDate: { color: '#c6c6c6', fontSize: 12 },
  rowTitle: { color: '#000000', fontSize: 20, marginBottom: 6, fontFamily: 'Newsreader' },
  rowExcerpt: { color: '#3c3b3b', lineHeight: 20 },

  /* Row actions */
  rowActions: { flexDirection: 'row', gap: 8, paddingTop: 6 },
  actionBtn: {
    paddingVertical: 7, paddingHorizontal: 14,
    borderWidth: 1, borderColor: '#e2e2e2', borderRadius: 2,
  },
  actionBtnHover: { borderColor: '#000', backgroundColor: '#000' },
  actionBtnText: { color: '#000000', fontSize: 13 },
  deleteBtn: { borderColor: '#e2e2e2' },
  deleteBtnHover: { borderColor: '#aa3621' },
  deleteBtnText: { color: '#aa3621', fontSize: 13 },
});
