import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Switch,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { useState } from 'react';
import { Typography } from '../../../src/components/Typography';
import { CreatePostData, Post } from '../../../lib/postsService';
import { Feather } from '@expo/vector-icons';

import Markdown from 'react-native-markdown-display';
import { Image } from 'react-native';

const markdownRules = {
  image: (node: any, children: any, parent: any, styles: any) => {
    return (
      <Image
        key={node.key}
        source={{ uri: node.attributes.src }}
        style={[styles.image, { width: '100%', minHeight: 200 }]}
        resizeMode="cover"
        alt={node.attributes.alt}
      />
    );
  }
};

function MarkdownPreview({ content }: { content: string }) {
  return (
    <ScrollView style={mdStyles.previewScroll} contentContainerStyle={mdStyles.previewContent}>
      <Markdown style={markdownTheme as any} rules={markdownRules}>
        {content || '*Preview will appear here…*'}
      </Markdown>
    </ScrollView>
  );
}

const markdownTheme = {
  body: {
    fontFamily: 'Work Sans',
    fontSize: 15,
    lineHeight: 26,
    color: '#3c3b3b',
  },
  heading1: {
    fontFamily: 'Newsreader',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 24,
    marginBottom: 12,
  },
  heading2: {
    fontFamily: 'Newsreader',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginBottom: 10,
  },
  heading3: {
    fontFamily: 'Newsreader',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  link: {
    color: '#aa3621',
    textDecorationLine: 'underline',
  },
  image: {
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 16,
  },
  code_inline: {
    backgroundColor: '#f3f3f3',
    padding: 4,
    borderRadius: 3,
    fontFamily: 'monospace',
  },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: '#aa3621',
    paddingLeft: 16,
    color: '#3c3b3b',
    fontStyle: 'italic',
    marginTop: 16,
    marginBottom: 16,
  },
  hr: {
    backgroundColor: '#e2e2e2',
    height: 1,
    marginTop: 24,
    marginBottom: 24,
  }
};

const CATEGORIES = ['Lifestyle', 'Design', 'Technology', 'Travel', 'Food', 'Health', 'Culture', 'Other'];

interface PostFormProps {
  initialData?: Partial<Post>;
  onSubmit: (data: CreatePostData) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export default function PostForm({ initialData, onSubmit, onCancel, submitLabel = 'Publish Post' }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [category, setCategory] = useState(initialData?.category ?? 'Lifestyle');
  const [author, setAuthor] = useState(initialData?.author ?? '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? '');
  const [content, setContent] = useState(initialData?.content ?? '# Your Title Here\n\nWrite your post content here. \n\n*Note: Markdown requires a space after the hash for headings (e.g., `# Heading`, not `#Heading`).*');
  const [isPublished, setIsPublished] = useState(initialData?.is_published ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [catOpen, setCatOpen] = useState(false);
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  const handleSubmit = async () => {
    if (!title.trim()) { setError('Title is required'); return; }
    if (!author.trim()) { setError('Author is required'); return; }
    if (!excerpt.trim()) { setError('Excerpt is required'); return; }
    if (!content.trim()) { setError('Content is required'); return; }
    setError(null);
    setLoading(true);
    try {
      await onSubmit({ title, category, author, excerpt, content, is_published: isPublished });
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

        {error && (
          <View style={styles.errorBox}>
            <View style={styles.errorAccent} />
            <Typography variant="labelMd" style={styles.errorText}>{error}</Typography>
          </View>
        )}

        {/* Row 1: Title + Author */}
        <View style={styles.row}>
          <View style={[styles.field, { flex: 1 }]}>
            <Typography variant="labelMd" style={styles.label}>Title *</Typography>
            <TextInput
              style={[styles.input, styles.inputLarge]}
              value={title}
              onChangeText={setTitle}
              placeholder="Your compelling post title…"
              placeholderTextColor="#c6c6c6"
              nativeID="post-title"
            />
          </View>
          <View style={[styles.field, { width: 200 }]}>
            <Typography variant="labelMd" style={styles.label}>Author *</Typography>
            <TextInput
              style={styles.input}
              value={author}
              onChangeText={setAuthor}
              placeholder="Your name"
              placeholderTextColor="#c6c6c6"
              nativeID="post-author"
            />
          </View>
        </View>

        {/* Category picker */}
        <View style={styles.field}>
          <Typography variant="labelMd" style={styles.label}>Category</Typography>
          <Pressable style={styles.input} onPress={() => setCatOpen(!catOpen)}>
            <View style={styles.selectRow}>
              <Typography variant="labelMd" style={styles.selectText}>{category}</Typography>
              <Feather name={catOpen ? 'chevron-up' : 'chevron-down'} size={15} color="#c6c6c6" />
            </View>
          </Pressable>
          {catOpen && (
            <View style={styles.dropdown}>
              {CATEGORIES.map(cat => (
                <Pressable
                  key={cat}
                  style={[styles.dropdownItem, cat === category && styles.dropdownItemActive]}
                  onPress={() => { setCategory(cat); setCatOpen(false); }}
                >
                  <Typography variant="labelMd" style={cat === category ? styles.dropdownItemTextActive : styles.dropdownItemText}>
                    {cat}
                  </Typography>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Excerpt */}
        <View style={styles.field}>
          <Typography variant="labelMd" style={styles.label}>Excerpt *</Typography>
          <Typography variant="labelMd" style={styles.hint}>Shown on the blog feed card</Typography>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={excerpt}
            onChangeText={setExcerpt}
            placeholder="A brief, compelling description of your post…"
            placeholderTextColor="#c6c6c6"
            multiline
            numberOfLines={3}
            nativeID="post-excerpt"
          />
        </View>

        {/* Markdown editor */}
        <View style={styles.field}>
          <View style={styles.editorHeader}>
            <View>
              <Typography variant="labelMd" style={styles.label}>Content *</Typography>
              <Typography variant="labelMd" style={styles.hint}>
                Markdown supported — use ![alt](url) to embed images anywhere. Preview is shown on the right.
              </Typography>
            </View>
          </View>

          {/* Split pane on wide screens */}
          <View style={[styles.editorPane, Platform.OS === 'web' && { flexDirection: 'row' }]}>
            {/* Write side — always visible */}
            <View style={[styles.writePane, Platform.OS === 'web' && { flex: 1, borderRightWidth: 1, borderRightColor: '#e2e2e2' }]}>
              <View style={styles.editorToolbar}>
                {[
                  { icon: 'bold', insert: '**bold**' },
                  { icon: 'italic', insert: '*italic*' },
                  { icon: 'image', insert: '![alt text](https://image-url.com)' },
                  { icon: 'link', insert: '[link text](https://url.com)' },
                  { icon: 'minus', insert: '\n---\n' },
                ].map(({ icon, insert }) => (
                  <Pressable
                    key={icon}
                    style={({ pressed }) => [styles.toolBtn, pressed && styles.toolBtnActive]}
                    onPress={() => setContent(prev => prev + insert)}
                  >
                    <Feather name={icon as any} size={14} color="#3c3b3b" />
                  </Pressable>
                ))}
                <Typography variant="labelMd" style={styles.toolbarHint}>
                  # H1 &nbsp;## H2 &nbsp;**bold** &nbsp;*italic* &nbsp;![alt](url)
                </Typography>
              </View>
              <TextInput
                style={styles.editorInput}
                value={content}
                onChangeText={setContent}
                placeholder={`# Start writing…\n\nUse **bold**, *italic*, and ![alt](url) for images.\n\nSeparate paragraphs with blank lines.`}
                placeholderTextColor="#c6c6c6"
                multiline
                nativeID="post-content"
              />
            </View>

            {/* Preview side */}
            <View style={[styles.previewPane, Platform.OS === 'web' && { flex: 1 }]}>
              <MarkdownPreview content={content} />
            </View>
          </View>
        </View>

        {/* Publish toggle */}
        <View style={styles.publishRow}>
          <View>
            <Typography variant="labelMd" style={styles.label}>Visibility</Typography>
            <Typography variant="labelMd" style={styles.hint}>
              {isPublished ? 'Published — visible on the blog' : 'Draft — not visible to readers'}
            </Typography>
          </View>
          <View style={styles.switchRow}>
            <Typography variant="labelMd" style={{ color: isPublished ? '#000' : '#c6c6c6' }}>
              {isPublished ? 'Published' : 'Draft'}
            </Typography>
            <Switch
              value={isPublished}
              onValueChange={setIsPublished}
              trackColor={{ false: '#e2e2e2', true: '#000000' }}
              thumbColor={isPublished ? '#ffffff' : '#f9f9f9'}
            />
          </View>
        </View>

        {/* Form actions */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [styles.cancelBtn, pressed && styles.cancelBtnHover]}
            onPress={onCancel}
          >
            <Typography variant="labelMd" style={styles.cancelBtnText}>Cancel</Typography>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.submitBtn, pressed && styles.submitBtnHover, loading && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={loading}
            nativeID="post-submit-btn"
          >
            {loading
              ? <ActivityIndicator size="small" color="#fff" />
              : <Typography variant="labelMd" style={styles.submitBtnText}>{submitLabel}</Typography>
            }
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 60 },

  row: { flexDirection: 'row', gap: 16 },
  field: { marginBottom: 24 },
  label: { color: '#000000', marginBottom: 4, letterSpacing: 0.3, fontSize: 12, textTransform: 'uppercase' },
  hint: { color: '#c6c6c6', fontSize: 12, marginBottom: 8 },

  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 2,
    padding: 13,
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Work Sans',
    outlineStyle: 'none',
  } as any,
  inputLarge: { fontSize: 16 },
  textarea: { minHeight: 90, textAlignVertical: 'top' },

  selectRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  selectText: { color: '#000000' },
  dropdown: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 2,
    marginTop: 2,
    overflow: 'hidden',
  },
  dropdownItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#f3f3f3' },
  dropdownItemActive: { backgroundColor: '#f3f3f3' },
  dropdownItemText: { color: '#3c3b3b' },
  dropdownItemTextActive: { color: '#aa3621' },

  /* Markdown editor */
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  tabRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 2,
    overflow: 'hidden',
  },
  tab: { paddingVertical: 6, paddingHorizontal: 14 },
  tabActive: { backgroundColor: '#000000' },
  tabText: { color: '#c6c6c6', fontSize: 12 },
  tabTextActive: { color: '#ffffff', fontSize: 12 },

  editorPane: {
    minHeight: 360,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  writePane: { flex: 1 },
  previewPane: { flex: 1, minHeight: 360 },

  editorToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    backgroundColor: '#f9f9f9',
    flexWrap: 'wrap',
  },
  toolBtn: {
    width: 28,
    height: 28,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolBtnActive: { backgroundColor: '#e2e2e2' },
  toolbarHint: { color: '#c6c6c6', fontSize: 11, marginLeft: 8, fontFamily: 'monospace' } as any,

  editorInput: {
    flex: 1,
    padding: 16,
    color: '#000000',
    fontSize: 15,
    lineHeight: 26,
    minHeight: 320,
    textAlignVertical: 'top',
    fontFamily: 'monospace',
    outlineStyle: 'none',
    backgroundColor: '#ffffff',
  } as any,

  /* Publish row */
  publishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    marginBottom: 28,
  },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },

  /* Actions */
  actions: { flexDirection: 'row', gap: 10, justifyContent: 'flex-end' },
  cancelBtn: {
    paddingVertical: 13, paddingHorizontal: 22,
    borderWidth: 1, borderColor: '#e2e2e2', borderRadius: 2,
  },
  cancelBtnHover: { backgroundColor: '#f3f3f3' },
  cancelBtnText: { color: '#3c3b3b' },
  submitBtn: {
    paddingVertical: 13, paddingHorizontal: 28,
    backgroundColor: '#000000', borderRadius: 2,
    alignItems: 'center', minWidth: 120,
  },
  submitBtnHover: { backgroundColor: '#aa3621' },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnText: { color: '#ffffff', letterSpacing: 0.5 },

  /* Error */
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8f7',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 24,
  },
  errorAccent: { width: 3, alignSelf: 'stretch', backgroundColor: '#aa3621' },
  errorText: { color: '#aa3621', padding: 12 },
});

const mdStyles = StyleSheet.create({
  previewScroll: { flex: 1 },
  previewContent: { padding: 20 },
  nativePreview: { flex: 1, padding: 20 },
  nativeText: { color: '#3c3b3b', fontSize: 15, lineHeight: 24 },
});
