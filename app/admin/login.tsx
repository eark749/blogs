import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { Typography } from '../../src/components/Typography';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (authError) setError(authError.message);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.brandRow}>
            <View style={styles.brandDash} />
            <Typography variant="labelMd" style={styles.brandLabel}>Admin</Typography>
          </View>

          <Typography variant="displaySm" weight="bold" style={styles.title}>
            Sign in
          </Typography>
          <Typography variant="bodyLg" style={styles.subtitle}>
            Access the blog administration panel
          </Typography>

          {error && (
            <View style={styles.errorBox}>
              <Typography variant="labelMd" style={styles.errorText}>{error}</Typography>
            </View>
          )}

          <View style={styles.field}>
            <Typography variant="labelMd" style={styles.label}>Email address</Typography>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#c6c6c6"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              nativeID="admin-email"
            />
          </View>

          <View style={styles.field}>
            <Typography variant="labelMd" style={styles.label}>Password</Typography>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#c6c6c6"
              secureTextEntry
              nativeID="admin-password"
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
            nativeID="admin-login-btn"
          >
            {loading
              ? <ActivityIndicator size="small" color="#fff" />
              : <Typography variant="labelMd" style={styles.buttonText}>Sign In →</Typography>
            }
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scroll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    padding: 48,
    borderWidth: 1,
    borderColor: '#e2e2e2',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 32,
  },
  brandDash: {
    width: 24,
    height: 1,
    backgroundColor: '#aa3621',
  },
  brandLabel: {
    color: '#aa3621',
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontSize: 11,
  },
  title: {
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Newsreader',
  },
  subtitle: {
    color: '#3c3b3b',
    marginBottom: 36,
  },
  errorBox: {
    backgroundColor: '#fff8f7',
    borderLeftWidth: 3,
    borderLeftColor: '#aa3621',
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#aa3621',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    color: '#000000',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 2,
    padding: 14,
    color: '#000000',
    fontSize: 15,
    outlineStyle: 'none',
    fontFamily: 'Work Sans',
  } as any,
  button: {
    backgroundColor: '#000000',
    borderRadius: 2,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    backgroundColor: '#aa3621',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    letterSpacing: 1,
  },
});
